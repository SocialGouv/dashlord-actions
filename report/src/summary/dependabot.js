/** @param {DependabotReport} report */
const summary = (report) => {
  if (report && report.grade) {
    return {
      dependabotGrade: report.grade,
      dependabotCount: report.totalCount
    };
  }
};

module.exports = summary;
