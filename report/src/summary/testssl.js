/** @param {SslTestReport} report */
const summary = (report) => {
  if (report) {
    const overallGrade =
      report &&
      report.find &&
      report.find((entry) => entry.id === "overall_grade");
    const value = overallGrade && overallGrade.finding;

    const notAfterNode = report.find((r) => r.id === "cert_notAfter");
    const notAfterIntermediateNode = report.find(
      (r) => r.id === "intermediate_cert_notAfter <#1>"
    );

    // warn a month before
    const warningDelay = 30 * 24 * 60 * 60 * 1000;
    let expirationDate = null;
    if (notAfterNode) {
      if (notAfterIntermediateNode) {
        const closest = Math.min(
          new Date(notAfterNode.finding).getTime(),
          new Date(notAfterIntermediateNode.finding).getTime()
        );
        expirationDate = closest;
      } else {
        expirationDate = new Date(notAfterNode.finding).getTime();
      }
    }
    console.log("HERE", expirationDate)

    const expiresSoon =
      expirationDate && new Date().getTime() + warningDelay > expirationDate;

    if (value) {
      let testsslExpireDate = null;
      if (expirationDate) {
        testsslExpireDate = new Date();
        testsslExpireDate.setTime(expirationDate);
      }
      return {
        testsslExpireSoon: expiresSoon,
        testsslExpireDate:
          testsslExpireDate && testsslExpireDate.toISOString(),
        testsslGrade: value,
      };
    }
  }
};

module.exports = summary;
