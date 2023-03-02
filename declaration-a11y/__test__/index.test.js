const fs = require("fs");
const path = require("path");
const { analyseFile } = require("../index");

const files = fs.readdirSync(path.join(__dirname, "samples"));

files
  .filter((name) => name.endsWith(".html"))
  .forEach((file) => {
    test(file, async () => {
      const result = await analyseFile(path.join(__dirname, "samples", file), {
        url: "https://example.com",
      });
      expect(result).toMatchSnapshot();
    });
  });
