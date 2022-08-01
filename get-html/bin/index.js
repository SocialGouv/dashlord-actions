#!/usr/bin/env node

const { getHTML } = require("../src");

const url = process.argv[process.argv.length - 1];

if (!url.match(/^https?:\/\//)) {
  throw Error("error: need an absolute URL");
}

getHTML(url)
  .then(console.log)
  .catch((e) => {
    console.error(e);
  });
