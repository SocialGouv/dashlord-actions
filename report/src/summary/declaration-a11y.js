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
  const foundGradeIndex = report.declaration
    ? Object.values(grades).indexOf(report.declaration)
    : -1;

  if (report.declaration === null) {
    // not detected
    grade = "F";
  } else if (foundGradeIndex > -1) {
    // @ts-ignore
    grade = Object.keys(grades)[foundGradeIndex];
  }

  return {
    "declaration-a11y": grade,
  };
};

module.exports = summary;
