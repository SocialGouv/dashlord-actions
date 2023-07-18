/**
 *
 * @param {number[]} arr
 * @returns
 */
const sum = (arr) => arr.reduce((a, c) => a + c, 0);

/** @param {DependabotReport} report */
const summary = (report) => {
  if (report && report.grade) {
    return {
      dependabotGrade: report.grade,
      dependabotCount: report.totalCount,
    };
  }
};

module.exports = summary;
