

const { getUrls } = require("./utils");
const generateUrlReport = require("./generateUrlReport")

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

if (require.main === module) {
  const report = generateReport();
  console.log(JSON.stringify(report, null, 2));
}

module.exports = {
  generateReport
}