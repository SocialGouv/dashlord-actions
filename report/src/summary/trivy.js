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
    if (report.filter((image) => image.ArtifactName).length === 0) {
      return;
    }
    const allVulns = report.flatMap(
      (image) =>
        (image &&
          image.Results &&
          image.Results.length &&
          image.Results.flatMap((res) => res.Vulnerabilities || [])) ||
        []
    );
    const vulnsCount = allVulns.length;
    const critical = allVulns.filter(
      (vuln) => vuln.Severity === "CRITICAL"
    ).length;
    const high = allVulns.filter((vuln) => vuln.Severity === "HIGH").length;
    const medium = allVulns.filter((vuln) => vuln.Severity === "MEDIUM").length;
    let trivyGrade = "A";
    if (critical > 10) {
      trivyGrade = "F";
    } else if (critical > 5) {
      trivyGrade = "E";
    } else if (critical > 0) {
      trivyGrade = "D";
    } else {
      if (high > 10) {
        trivyGrade = "C";
      } else if (high > 0 || medium > 0) {
        trivyGrade = "B";
      }
    }
    return { trivy: vulnsCount, trivyGrade };
  }
};

module.exports = summary;
