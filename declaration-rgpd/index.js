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

const analyseDom = async (
  dom,
  { url = "", thirdPartiesOutput = "{}" } = {}
) => {
  const thirdPartiesJson = JSON.parse(thirdPartiesOutput);
  const text = dom.window.document.body.textContent;
  // add an object to result for every searches entry
  const results = searches.map((search) => {
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
        const htmlOutput = execSync(
          `npx pwpr --url=${result.declarationUrl} --load=30000`
        );
        const htmlString = htmlOutput.toString().toUpperCase();
        result.maxScore = search.mustMatch.length;
        result.score = search.mustMatch.filter((words) => {
          const match = htmlString.match(
            `${words.join("|").toUpperCase()}`,
            "i"
          );

          if (!match) {
            result.missingWords.push(words.join(" (ou) "));
          }

          return match;
        }).length;

        if (result.slug === "pc" && thirdPartiesJson.trackers) {
          const trackers = thirdPartiesJson.trackers;
          result.maxScore += trackers.length;
          result.score += trackers.filter(({ type }) => {
            const match = htmlString.match(`${type.toUpperCase()}`, "i");

            if (!match) {
              result.missingTrackers.push(words.join(" (ou) "));
            }

            return match;
          }).length;
        }
      }
    }
    return result;
  });
  return results;
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
