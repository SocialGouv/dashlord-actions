
// each tool can output multiple values
const tools = {
  /** @param {CodescanReport} report */
  codescan: (report) => require("./codescan")(report),
  /** @param {DependabotReport} report */
  dependabot: (report) => require("./dependabot")(report),
  /** @param {HttpReport} report */
  http: (report) => require("./http")(report),
  /** @param {LighthouseReport} report */
  lhr: (report) => require("./lighthouse")(report),
  /** @param {NmapReport} report */
  nmap: (report) => require("./nmap")(report),
  /** @param {SslTestReport} report */
  testssl: (report) => require("./testssl")(report),
  /** @param {ThirdPartiesReport} report */
  thirdparties: (report) => require("./thirdparties")(report),
  /** @param {UpDownReport} report */
  updownio: (report) => require("./updownio")(report),
  /** @param {StatsReport} report */
  stats: (report) => require("./stats")(report),
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
