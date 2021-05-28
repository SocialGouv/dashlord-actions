/** @param {SslTestReport} report */
const summary = (report) => {
  if (report) {
    const overallGrade =
      report &&
      report.find &&
      report.find((entry) => entry.id === "overall_grade");
    const value = overallGrade && overallGrade.finding;
    if (value) {
      return {
        testssl: value,
      };
    }
  }
};

module.exports = summary;
