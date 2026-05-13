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

  if (isMentionPresent && isDeclarationPresent) {
    grade = "A";
  } else {
    grade = "F";
  }

  return {
    "declaration-a11y": grade,
  };
};

module.exports = summary;
