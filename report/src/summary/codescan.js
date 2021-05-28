/** @param {CodescanAlert[]} alerts */
const getCodescanAlertGrade = (alerts) => {
  return alerts.filter((a) => a.rule.severity === "error").length
    ? "F"
    : alerts.length
    ? "B"
    : "A";
};

/** @param {CodescanReport} report */
const summary = (report) => {
  if (report) {
    // codescan
    const codescanCount =
      report &&
      report.filter &&
      report
        .filter(Boolean)
        .map((repo) => (repo ? (repo.alerts ? repo.alerts.length : 0) : 0))
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
        .map((repo) =>
          repo ? (repo.alerts ? getCodescanAlertGrade(repo.alerts) : "A") : "A"
        );

    const codescanGrade = grades && grades.reduce(maxGrade);
    if (codescanGrade) {
      return {
        codescan: codescanGrade,
      };
    }
  }
};

module.exports = summary;
