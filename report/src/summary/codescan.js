/** @param {CodescanReport} report */
const summary = (report) => {
  if (report) {
      return {
        codescanCount: report.totalCount,
        codescanGrade: report.grade
      };
  }
};

module.exports = summary;
