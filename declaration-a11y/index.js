const jsdom = require("jsdom");
const { fuzzy } = require("fast-fuzzy");

const { JSDOM } = jsdom;

const searches = [
  {
    needle: "Accessibilité : non conforme",
  },
  {
    needle: "Accessibilité : partiellement conforme",
  },
  {
    needle: "Accessibilité : totalement conforme",
  },
];

const analyseFile = async (filePath) => {
  const dom = await JSDOM.fromFile(filePath);
  const text = dom.window.document.body.textContent;
  // fuzzy find the best match
  const status = searches
    .map(({ needle }) => ({ needle, score: fuzzy(needle, text) }))
    .sort((a, b) => a.score - b.score)
    .reverse()[0];
  // ensure were confident enough
  if (status.score > 0.9) {
    return { declaration: status.needle };
  }
  return { declaration: null };
};

module.exports = analyseFile;

if (require.main === module) {
  const filePath = process.argv[process.argv.length - 1];
  analyseFile(filePath)
    .then((result) => console.log(JSON.stringify(result)))
    .catch(() => console.log(JSON.stringify({ declaration: undefined })));
}
