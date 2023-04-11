/**
 *
 * @param {number[]} arr
 * @returns
 */
const sum = (arr) => arr.reduce((a, c) => a + c, 0);

/** @param {SonarCloudReport} report */
const summary = (report) => {
  if (!report || report.length === 0) return;
  const bugs = sum(report.map((repo) => repo.result.status.bugs));
  const vulnerabilities = sum(
    report.map((repo) => repo.result.status.vulnerabilities)
  );
  const codeSmells = sum(report.map((repo) => repo.result.status.codeSmells));
  const gateFailed =
    report.filter((repo) => repo.result.status?.qualityGateStatus === "ERROR")
      .length > 0;
  const gateSuccess =
    report.filter((repo) => repo.result.status?.qualityGateStatus === "OK")
      .length === report.length;
  if (gateFailed || vulnerabilities > 10 || bugs > 50) {
    return {
      sonarcloudGrade: "F",
    };
  }
  if (gateSuccess) {
    return {
      sonarcloudGrade: "A",
    };
  }

  const grade =
    vulnerabilities > 0
      ? "E"
      : bugs > 10
      ? "D"
      : bugs > 0
      ? "C"
      : codeSmells > 0
      ? "B"
      : "A";
  if (grade) {
    return {
      sonarcloudGrade: grade,
    };
  }
};

module.exports = summary;
