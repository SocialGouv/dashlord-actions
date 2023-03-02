/** @param {EcoIndexReport} report */
const summary = (report) => {
  const grade = report && report.find((e) => e.label === "Note");
  if (grade && grade.value) {
    return {
      ecoindexGrade: grade.value,
    };
  }
};

module.exports = summary;
