/**
 *
 * @param {ZapReportSiteAlert} row
 */
const getGrade = (row) =>
  ({
    0: "A", // info
    1: "B", // low
    2: "D", // medium
    3: "F", // high
  }[row.riskcode] || "A");

/** @param {ZapReport} report */
const summary = (report) => {
  if (report && report.site && report.site.length) {
    const alerts = report.site[0].alerts || [];
    const maxCritic =
      (alerts.length &&
        alerts.sort((a, b) => b.riskcode.localeCompare(a.riskcode))[0]) ||
      null;
    if (maxCritic) {
      return {
        zapCount: alerts.filter((a) => a.riskcode !== "0").length,
        zapGrade: getGrade(maxCritic),
      };
    }
  }
};

module.exports = summary;
