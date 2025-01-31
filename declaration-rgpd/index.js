const jsdom = require("jsdom");
const fs = require("fs");
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
      ["hébergeur", "hébergement", "hebergeur", "hebergement"],
      ["éditeur", "édité par", "editeur", "edité par"],
    ],
  },
  {
    slug: "pc",
    needles: [
      "Politique de confidentialité",
      "Privacy Policy",
      "Données personnelles",
      "Mentions d'information",
      "Confidentialité"
    ],
    mustMatch: [
      ["@"],
      ["finalité"],
      ["durée de la conservation", "durée de conservation"],
      ["sous-traitant", "sous traitant"],
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

const getDeclarationUrl = (dom, bestMatch, url) => {
  let declarationUrl;
  // try to find related href if any
  Array.from(dom.window.document.querySelectorAll("a"))
    .filter((a) => fuzzy(bestMatch.needle, a.text) > 0.9)
    .forEach((a) => {
      // make URL absolute when possible
      const link = a.getAttribute("href");
      if (link !== "#") {
        if (link.match(/^https?:\/\//) || link.match(/^\/\//)) {
          declarationUrl = link;
        } else if (link.charAt(0) === "/") {
          const host = url.replace(/(https?:\/\/[^/]+).*/, "$1");
          declarationUrl = `${host}${link}`;
        } else {
          declarationUrl = `${url}/${link}`;
        }
      }
    });
  return declarationUrl;
};

const analyseDeclaration = (result, search, thirdPartiesJson) => {
  // get declaration HTML
  if (result.declarationUrl.toLowerCase().match(/\.pdf$/)) {
    // todo: handle PDF
    return result;
  }
  let htmlOutput;
  try {
    htmlOutput = execSync(
      `LANGUAGE=fr npx @socialgouv/get-html ${result.declarationUrl}`
    );
  } catch (e) {
    console.error(`Error: get-html failed for ${result.declarationUrl}`);
    return result;
  }
  const htmlString = htmlOutput.toString().toUpperCase();
  result.maxScore = search.mustMatch.length;

  // get score from required words & missing words array
  let matchResult = matchInHtml(htmlString, search.mustMatch);
  result.score = matchResult.score;
  result.missingWords = matchResult.missing;

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
  const text = Array.from(dom.window.document.querySelectorAll("a"))
    .map((a) => a.text)
    .join(" ");
  // add an object to result for every searches entry
  return searches.map((search) => {
    // fuzzy find the best match
    let result = {
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
    const bestMatch = status[0];
    if (bestMatch.score > 0.8) {
      result.mention = bestMatch.needle;
      result.declarationUrl = getDeclarationUrl(dom, bestMatch, url);

      if (result.declarationUrl) {
        let thirdPartiesJson = {};
        try {
          thirdPartiesJson = JSON.parse(thirdPartiesOutput);
        } catch (e) {
          console.error("Cannot parse thirdparties JSON", e);
        }
        result = analyseDeclaration(result, search, thirdPartiesJson);
      }
    }
    return result;
  });
};

const analyseFile = async (filePath, { url, thirdPartiesOutput } = {}) => {
  const html = fs.readFileSync(filePath).toString();
  const dom = await new JSDOM(html);
  return analyseDom(dom, { url, thirdPartiesOutput });
};

// warn: this wont work for SPA applications
const analyseUrl = async (url) => {
  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0 - dashlord",
  });
  const dom = await JSDOM.fromURL(url, { resources: resourceLoader });
  return analyseDom(dom, { url });
};

module.exports = { analyseDom, analyseFile, analyseUrl };

if (require.main === module) {
  const url = process.argv[process.argv.length - 3]; // url, to make absolute links
  const filePath = process.argv[process.argv.length - 2]; // file path to analyse
  const thirdPartiesOutput = process.argv[process.argv.length - 1]; // third parties output

  analyseFile(filePath, { url, thirdPartiesOutput })
    .then((result) => console.log(JSON.stringify(result)))
    .catch((e) => {
      console.error(e);
      console.log(JSON.stringify({ declaration: undefined }));
    });
}
