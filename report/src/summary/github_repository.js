/** @param {PageReport} report */
const summary = (report) => {
  if (report) {
    const githubRepositoryGrade = report.grade;
    if (githubRepositoryGrade) {
      return {
        githubRepositoryGrade
      };
    }
  }
};

module.exports = summary;