/** @param {HttpReport} report */
const summary = (report) => {
  if (report && report.grade) {
    return {
      http: report.grade,
    };
  }
};

module.exports = summary;
