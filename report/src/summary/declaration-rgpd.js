const grades = ["F", "D", "A"];

/** @param {DeclarationRgpdReport} report */
const summary = (report) => {
  // not known
  if (!report) {
    return {
      "declaration-rgpd": undefined,
    };
  }

  const tmpSummary = report.map((result) => {
    let grade = 0;

    if (result.declarationUrl) {
      grade += 1;

      if (result.score === result.maxScore) {
        grade += 1;
      }
    }

    return [`declaration-rgpd-${result.slug}`, grades[grade]];
  });

  return Object.fromEntries(tmpSummary);
};

module.exports = summary;
