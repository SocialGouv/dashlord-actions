/** @param {PageReport} report */
const summary = (report) => {
  if (report) {
    const statsGrade = report.grade;
    if (statsGrade) {
      return {
        statsGrade
      };
    }
  }
};

module.exports = summary;