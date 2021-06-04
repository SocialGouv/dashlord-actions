/** @param {UpDownReport} report */
const summary = (report) => {
  if (report) {
    const uptime = report.uptime;
    const apdex = report.metrics && report.metrics.apdex;
    if (uptime !== undefined) {
      return {
        apdex,
        apdexGrade: report.apdexGrade,
        uptime,
        uptimeGrade: report.uptimeGrade,
      };
    }
  }
};

module.exports = summary;
