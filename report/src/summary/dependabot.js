/**
 *
 * @param {number[]} arr
 * @returns
 */
const sum = (arr) => arr.reduce((a, c) => a + c, 0);

/** @param {DependabotReport} report */
const summary = (report) => {
  if (report && report.grade) {
    const totalCount = sum(
      report.repositories.map(
        (repo) =>
          repo.vulnerabilityAlerts.nodes.filter((node) => !node.dismissedAt)
            .length
      )
    );
    return {
      dependabotGrade: report.grade,
      dependabotCount: totalCount,
    };
  }
};

module.exports = summary;
