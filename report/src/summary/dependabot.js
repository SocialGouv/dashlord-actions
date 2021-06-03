/** @param {DependabotReport} report */
const summary = (report) => {
  if (report) {
    // dependabot
    const dependabotCount =
      report &&
      report.filter &&
      report
        .filter(Boolean)
        .map((repo) => repo.vulnerabilityAlerts.totalCount)
        .reduce((prev, curr) => prev + curr, 0);
    /**
     * @param {"F" | "B" | "A"} a
     * @param {"F" | "B" | "A"} b
     */
    const maxGrade = (a, b) => {
      const grades = new Map();
      grades.set("F", 3);
      grades.set("B", 2);
      grades.set("A", 1);
      const orders = new Map();
      orders.set(3, "F");
      orders.set(2, "B");
      orders.set(1, "A");
      return orders.get(Math.max(grades.get(a), grades.get(b)));
    };
    const grades =
      report &&
      report.filter &&
      report
        .filter(Boolean)
        .map((repo) => repo.grade);

    const dependabotGrade = grades && grades.reduce(maxGrade);
    if (dependabotGrade) {
      return {
        dependabotGrade,
        dependabotCount
      };
    }
  }
};

module.exports = summary;
