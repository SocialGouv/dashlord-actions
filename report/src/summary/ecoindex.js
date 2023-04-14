/** @param {EcoIndexReport} report */
const summary = (report) => {
  const result = (report && report.length && report[0]) || null;
  if (result && result.grade) {
    return {
      ecoindexGrade: result.grade,
    };
  }
};

module.exports = summary;
