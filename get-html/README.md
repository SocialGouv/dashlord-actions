# socialgouv/dashlord-actions/get-html

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" alt="License: Apache-2.0"></a>
  <a href="https://www.npmjs.com/package/@socialgouv/get-html"><img src="https://img.shields.io/npm/v/@socialgouv/get-html.svg" alt="Npm version"></a> 
  <br>
  <a href="https://www.npmjs.com/package/@socialgouv/get-html"><img src="https://nodei.co/npm/@socialgouv/get-html.png?downloads=true&downloadRank=true&stars=true" alt="Npm banner"></a> 
</p>

Get HTML content from any URL, single-page or not, using [puppeteer](https://github.com/puppeteer/puppeteer)

## Usage

### npm

```js
const { getHTML } = require("@socialgouv/get-html");

getHTML("https://wikipedia.org").then(console.log);
```

### github-action

```yaml
jobs:
  html:
    steps:
      - uses: "socialgouv/dashlord-actions/get-html@v1"
        with:
          url: https://wikipedia.org
          # optionals
          language: fr
          output: result.html
      - name: demo
        run: |
          cat result.html
```
