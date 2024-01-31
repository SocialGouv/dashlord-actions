const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const core = require("@actions/core");

const { getUrls, writeFile, getConfig } = require("./utils");
const generateUrlReport = require("./generateUrlReport");
//const generateTrends = require("./trends");

const DASHLORD_REPO_PATH = process.env.DASHLORD_REPO_PATH || ".";

/**
 * Minify report JSON data
 *
 * @returns {DashLordReport} Full DashLoard report as JSON
 */
const generateReport = () => {
  const urls = getUrls()
    .map((url) => generateUrlReport(url))
    .filter(Boolean);
  /** @ts-expect-error #TODO #WTH */
  return urls;
};

const generateJsons = async () => {
  const report = generateReport();

  const dashlordConfig = getConfig();

  core.info("DASHLORD_REPO_PATH " + DASHLORD_REPO_PATH);

  core.info(`write config.json`);
  // copy dashlord.yaml as JSON for the website
  writeFile(
    path.join(__dirname, "..", "www", "src", "config.json"),
    JSON.stringify(dashlordConfig, null, 2)
  );

  core.info(`write report.json`);
  // copy dashlord report.json for the website
  writeFile(
    path.join(__dirname, "..", "www", "src", "report.json"),
    JSON.stringify(report, null, 2)
  );

  // core.info(`generate trends.json`);
  // const trends = await generateTrends(DASHLORD_REPO_PATH, report);

  // core.info(`write trends.json`);
  // // copy dashlord trends.json for the website
  // writeFile(
  //   path.join(__dirname, "..", "www", "src", "trends.json"),
  //   JSON.stringify(trends, null, 2)
  // );
};

module.exports = {
  generateReport,
};

if (require.main === module) {
  generateJsons();
}
