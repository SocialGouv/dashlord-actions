/** @param {DependabotReport} report */
const summary = (report) => {
  if (report) {
    return {
      dependabotGrade: report.grade,
      dependabotCount: report.totalCount
    };
  }
};

module.exports = summary;
