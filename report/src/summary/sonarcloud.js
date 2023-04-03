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
  const grade =
    vulnerabilities > 0 ? "F" : bugs > 0 ? "C" : codeSmells > 0 ? "B" : "A";
  if (grade) {
    return {
      sonarcloudGrade: grade,
    };
  }
};

module.exports = summary;
