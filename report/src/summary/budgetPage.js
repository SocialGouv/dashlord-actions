/** @param {PageReport} report */
const summary = (report) => {
  if (report) {
    const budgetPageGrade = report.grade;
    if (budgetPageGrade) {
      return {
        budgetPageGrade
      };
    }
  }
};

module.exports = summary;