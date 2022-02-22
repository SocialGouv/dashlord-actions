const jsdom = require("jsdom");
const { fuzzy } = require("fast-fuzzy");

const { JSDOM } = jsdom;

const searches = [
  {
    slug: "ml",
    needles: ["Mentions légales", "Legal Notice"],
  },
  {
    slug: "pc",
    needles: ["Politique de confidentialité", "Privacy Policy"],
  },
];

const analyseDom = async (dom, { url = "" } = {}) => {
  const text = dom.window.document.body.textContent;
  // add an object to result for every searches entry
  const results = searches.map((search) => {
    // fuzzy find the best match
    const result = { slug: search.slug, mention: null };
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
      // loose href search
      if (!result.declarationUrl) {
        Array.from(dom.window.document.querySelectorAll("a")).filter((a) => {
          if (fuzzy(search.needles[0], a.text) > 0.9) {
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
  });
  return results;
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
