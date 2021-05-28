const getPerformanceScore = require("./lighthouse");

const thirdPartySummary = require("./thirdparties");
const upDownIoSummary = require("./updownio");
const nmapSummary = require("./nmap");
const testsslSummary = require("./testssl");
const lighthouseSummary = require("./lighthouse");
const dependabotSummary = require("./dependabot");
const codescanSummary = require("./codescan");

// each tool can output multiple scores
const tools = {
  /** @param {CodescanReport} report */
  codescan: (report) =>codescanSummary(report),
  /** @param {DependabotReport} report */
  dependabot: (report) => dependabotSummary(report),
  /** @param {HttpReport} report */
  http: (report) => {
    if (report) {
      return {
        http: report.grade
      }
    }
  },
  /** @param {LighthouseReport} report */
  lhr: (report) => lighthouseSummary(report),
  /** @param {NmapReport} report */
  nmap: (report) => nmapSummary(report),
  /** @param {SslTestReport} report */
  testssl: (report) => testsslSummary(report),
  /** @param {ThirdPartiesReport} report */
  thirdparties: (report) => thirdPartySummary(report),
  /** @param {UpDownReport} report */
  updownio: (report) => upDownIoSummary(report),
};

/**
 * @param {UrlReport} urlReport
 *
 * @returns {object}
 */
const computeSummary = (urlReport) => {
  /** @type {Record<string,any>} */
  let summary = {};
  Object.keys(urlReport).forEach((key) => {
    if (key in tools) {
      summary = {
        ...summary,
        //@ts-expect-error
        ...(tools[key](urlReport[key]) || {}),
      };
    }
  });
  return summary;
};
module.exports = { computeSummary };
