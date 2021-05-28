/** @param { NmapVulnerability[]} vulnerabilities */
const getNmapOpenPortGrade = (vulnerabilities) => {
  return vulnerabilities.filter(
    (a) => a.is_exploit && Number.parseFloat(a.cvss) > 7
  ).length
    ? "F"
    : vulnerabilities.length
    ? "B"
    : "A";
};

/** @param {NmapReport} report */
const summary = (report) => {
  if (report) {
    const nmapCount = report.open_ports
      ? report.open_ports
          .filter(Boolean)
          .map((port) => port.service.vulnerabilities.length)
          .reduce((prev, curr) => prev + curr, 0)
      : 0;
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
    const grades = report.open_ports
      ? report.open_ports
          .filter(Boolean)
          .map((port) => getNmapOpenPortGrade(port.service.vulnerabilities))
      : [];
    const nmapGrade = (grades.length && grades.reduce(maxGrade)) || undefined;
    if (nmapGrade) {
      return {
        nmapCount,
        nmapGrade,
      };
    }
  }
};

module.exports = summary;
