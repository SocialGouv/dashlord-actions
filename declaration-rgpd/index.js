const jsdom = require("jsdom");
const { fuzzy } = require("fast-fuzzy");
const { execSync } = require("child_process");

const { JSDOM } = jsdom;

const searches = [
  {
    slug: "ml",
    needles: ["Mentions légales", "Legal Notice"],
    mustMatch: [
      ["directeur", "directrice"],
      ["publication"],
      ["hébergeur", "hébergement"],
      ["éditeur"],
    ],
  },
  {
    slug: "pc",
    needles: [
      "Politique de confidentialité",
      "Privacy Policy",
      "Données personnelles",
    ],
    mustMatch: [
      ["@"],
      ["finalité"],
      ["durée de conservation"],
      ["sous-traitants", "sous traitants"],
    ],
  },
];

const matchInHtml = (htmlString, searchArray) => {
  const missing = [];
  const score = searchArray.filter((item) => {
    const match = htmlString.match(
      `${
        typeof item === "object"
          ? item.join("|").toUpperCase()
          : item.toUpperCase()
      }`,
      "i"
    );

    if (!match) {
      missing.push(typeof item === "object" ? item.join(" (ou) ") : item);
    }

    return match;
  }).length;

  return { score, missing };
};

const analyseDeclaration = (result) => {
  // get declaration HTML
  const htmlOutput = execSync(
    `npx pwpr --url=${result.declarationUrl} --load=30000`
  );
  const htmlString = htmlOutput.toString().toUpperCase();
  result.maxScore = search.mustMatch.length;

  // get score from required words & missing words array
  let matchResult = matchInHtml(htmlString, search.mustMatch);
  result.score = matchResult.score;
  result.missingWords = mmatchResult.issing;

  // check trackers mention in privacy policy
  if (result.slug === "pc" && thirdPartiesJson.trackers) {
    const trackers = thirdPartiesJson.trackers
      .map((_) => _.type)
      //get unique types & not unknown
      .filter(
        (value, index, self) =>
          self.indexOf(value) === index && value !== "unknown"
      );
    result.maxScore += trackers.length;

    // get score from required trackers & missing trackers array
    matchResult = matchInHtml(htmlString, trackers);
    result.score += matchResult.score;
    result.missingTrackers = matchResult.missing;
  }

  return result;
};

const analyseDom = async (
  dom,
  { url = "", thirdPartiesOutput = "{}" } = {}
) => {
  const thirdPartiesJson = JSON.parse(thirdPartiesOutput);
  const text = dom.window.document.body.textContent;
  // add an object to result for every searches entry
  return searches.map((search) => {
    // fuzzy find the best match
    const result = {
      slug: search.slug,
      mention: null,
      maxScore: 0,
      score: 0,
      missingWords: [],
      missingTrackers: [],
    };
    const status = search.needles
      .map((needle) => ({ needle, score: fuzzy(needle, text) }))
      .sort((a, b) => a.score - b.score)
      .reverse();
    // ensure were confident enough
    const bestStatus = status[0];
    if (bestStatus.score > 0.9) {
      result.mention = bestStatus.needle;
      // try to find related href if any
      Array.from(dom.window.document.querySelectorAll("a")).filter((a) => {
        if (fuzzy(bestStatus.needle, a.text) > 0.9) {
          // make URL absolute when possible
          const link = a.getAttribute("href");
          if (link !== "#") {
            const declarationUrl =
              link.charAt(0) === "/" ? `${url || ""}${link}` : link;
            result.declarationUrl = declarationUrl;
          }
        }
      });

      if (result.declarationUrl) {
        result = analyseDeclaration(result);
      }
    }
    return result;
  });
};

const analyseFile = async (filePath, { url, thirdPartiesOutput } = {}) => {
  const dom = await JSDOM.fromFile(filePath);
  return analyseDom(dom, { url, thirdPartiesOutput });
};

// warn: this wont work for SPA applications
const analyseUrl = async (url) => {
  const dom = await JSDOM.fromURL(url);
  return analyseDom(dom, { url });
};

module.exports = { analyseFile, analyseUrl };

if (require.main === module) {
  const url = process.argv[process.argv.length - 3]; // url, to make absolute links
  const filePath = process.argv[process.argv.length - 2]; // file path to analyse
  const thirdPartiesOutput = process.argv[process.argv.length - 1]; // third parties output
  analyseFile(filePath, { url, thirdPartiesOutput })
    .then((result) => console.log(JSON.stringify(result)))
    .catch(() => console.log(JSON.stringify({ declaration: undefined })));
}
