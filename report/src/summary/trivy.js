/**
 * sum an array
 *
 * @param {number[]} arr
 *
 **/
const sum = (arr) => arr.reduce((a, c) => a + c, 0);

/** @param {TrivyReport} report */
const summary = (report) => {
  if (report && report.length) {
    const allVulns = report.flatMap(
      (image) => (image.trivy && image.trivy.Vulnerabilities) || []
    );
    const vulnsCount = allVulns.length;
    const critical = allVulns.filter(
      (vuln) => vuln.Severity === "CRITICAL"
    ).length;
    const high = allVulns.filter((vuln) => vuln.Severity === "HIGH").length;
    const medium = allVulns.filter((vuln) => vuln.Severity === "MEDIUM").length;
    const trivyGrade = critical ? "F" : high ? "E" : medium ? "C" : "A";
    return { trivy: vulnsCount, trivyGrade };
  }
};

module.exports = summary;
