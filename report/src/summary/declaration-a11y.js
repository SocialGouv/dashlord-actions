const grades = {
  A: "Accessibilité : totalement conforme",
  B: "Accessibilité : partiellement conforme",
  C: "Accessibilité : non conforme",
};

/** @param {DeclarationA11yReport} report */
const summary = (report) => {
  // not known
  let grade = undefined;
  if (!report) {
    return {
      "declaration-a11y": undefined,
    };
  }

  const isMentionPresent = Boolean(report.mention && report.mention.length > 1)
  const isDeclarationPresent = Boolean(report.declarationUrl && report.declarationUrl.length > 1)

  if (!isMentionPresent || !isDeclarationPresent) {
    grade = "F";
  } else if (report.declarationIsUpToDate) {
    grade = "A";
  } else {
    grade = "D";
  }

  return {
    "declaration-a11y": grade,
  };
};

module.exports = summary;
