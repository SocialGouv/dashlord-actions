const jsdom = require("jsdom");
const { fuzzy } = require("fast-fuzzy");

const { JSDOM } = jsdom;

const searches = [
  {
    needle: "Mentions légales",
  },
  {
    needle: "Politique de confidentialité",
  },
];

const analyseDom = async (dom, { url = "" } = {}) => {
  const text = dom.window.document.body.textContent;
  // fuzzy find the best match
  const status = searches
    .map(({ needle }) => ({ needle, score: fuzzy(needle, text) }))
    .sort((a, b) => a.score - b.score)
    .reverse();
  // ensure were confident enough
  const result = { mention: null };
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
    // loose href search
    if (!result.declarationUrl) {
      Array.from(dom.window.document.querySelectorAll("a")).filter((a) => {
        if (fuzzy("Accessibilité", a.text) > 0.9) {
          // make URL absolute when possible
          const link = a.getAttribute("href");
          if (link !== "#") {
            const declarationUrl =
              link.charAt(0) === "/" ? `${url || ""}${link}` : link;
            result.declarationUrl = declarationUrl;
          }
        }
      });
    }
  }
  return result;
};

const analyseFile = async (filePath, { url } = {}) => {
  const dom = await JSDOM.fromFile(filePath);
  return analyseDom(dom, { url });
};

// warn: this wont work for SPA applications
const analyseUrl = async (url) => {
  const dom = await JSDOM.fromURL(url);
  return analyseDom(dom, { url });
};

module.exports = { analyseFile, analyseUrl };

if (require.main === module) {
  const url = process.argv[process.argv.length - 2]; // url, to make absolute links
  const filePath = process.argv[process.argv.length - 1]; // file path to analyse
  analyseFile(filePath, { url })
    .then((result) => console.log(JSON.stringify(result)))
    .catch(() => console.log(JSON.stringify({ declaration: undefined })));
}
