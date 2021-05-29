/** @param {HttpReport} report */
const summary = (report) => {
  if (report && report.grade) {
    return {
      httpGrade: report.grade,
    };
  }
};

module.exports = summary;
