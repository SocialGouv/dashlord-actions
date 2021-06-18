const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const { getUrls, writeFile, getConfig } = require("./utils");
const generateUrlReport = require("./generateUrlReport");
const generateTrends = require("./trends");

const DASHLORD_REPO_PATH = process.env.DASHLORD_REPO_PATH || ".";

/**
 * Minify Lighthouse JSON data
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

  // copy dashlord.yaml as JSON for the website
  writeFile(
    path.join(__dirname, "..", "www", "src", "config.json"),
    JSON.stringify(dashlordConfig, null, 2)
  );

  // copy dashlord report.json for the website
  writeFile(
    path.join(__dirname, "..", "www", "src", "report.json"),
    JSON.stringify(report, null, 2)
  );

  const trends = await generateTrends(DASHLORD_REPO_PATH, report);

  // copy dashlord trends.json for the website
  writeFile(
    path.join(__dirname, "..", "www", "src", "trends.json"),
    JSON.stringify(trends, null, 2)
  );
};

module.exports = {
  generateReport,
};

if (require.main === module) {
  generateJsons();
}
