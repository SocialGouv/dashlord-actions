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
  const mentionIndex = report.mention
    ? Object.values(grades).indexOf(report.mention)
    : -1;

  if (report.mention === null) {
    // not detected
    grade = "F";
  } else if (mentionIndex > -1) {
    if (report.declarationUrl) {
      // @ts-ignore
      grade = Object.keys(grades)[mentionIndex];
    } else if (report.mention === "Accessibilité : non conforme") {
      grade = "D";
    } else {
      grade = "F";
    }
  }

  return {
    "declaration-a11y": grade,
  };
};

module.exports = summary;
