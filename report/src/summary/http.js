/** @param {HttpReport} report */
const summary = (report) => {
  // @ts-ignore use legacy value
  if (report && report.grade) {
    return {
      // @ts-ignore use legacy value
      httpGrade: report.grade,
    };
  } else if (report && report.scan && report.scan.grade) {
    return {
      httpGrade: report.scan.grade,
    };
  }
};

module.exports = summary;
