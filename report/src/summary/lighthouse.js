const { scoreToGrade } = require("../utils");

/** @param {LighthouseReport} report */
const summary = (report) => {
  /* @type {LighthouseReport} */
  const reportData = (report && Array.isArray(report) && report[0]) || report; // use first lhr report
  if (reportData && reportData.categories) {
    const lhrCategories = reportData.categories;

    return Object.keys(lhrCategories).reduce((scores, key) => {
      const score = lhrCategories[key].score;
      return {
        ...scores,
        [`lighthouse_${key}`]: score,
        [`lighthouse_${key}Grade`]: scoreToGrade(score),
      };
    }, {});
  }
};

module.exports = summary;
