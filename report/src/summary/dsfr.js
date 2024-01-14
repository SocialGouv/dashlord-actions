/** @param {DsFrReport} report */
const summary = (report) => {
  if (!report) return null;
  return {
    dsfrGrade:
      report.detected === true ? "A" : report.detected === false ? "F" : null,
  };
};

module.exports = summary;
