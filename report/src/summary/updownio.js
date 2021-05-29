const { scoreToGrade } = require("../utils");


/** @param {number} uptime */
const getGradeUpdownio = (uptime) => {
  return uptime > 0.99
    ? "A"
    : uptime > 0.98
    ? "B"
    : uptime > 0.97
    ? "C"
    : uptime > 0.96
    ? "D"
    : uptime > 0.95
    ? "E"
    : "F";
};


/** @param {UpDownReport} report */
const summary = (report) => {
  if (report) {
    const uptime = report.uptime;
    const apdex = report.metrics && report.metrics.apdex;
    if (uptime !== undefined) {
      return {
        apdex,
        apdexGrade: apdex && scoreToGrade(apdex),
        uptime,
        uptimeGrade: getGradeUpdownio(uptime),
      };
    }
  }
};

module.exports = summary;
