const { scoreToGrade } = require("../utils");

// compute a performance score from 0 to 100 from lighthouse report
/**
 * @param {LighthouseReport} reportData
 *
 * @returns {number}
 */
const getPerformanceScore = (reportData) => {
  /* @type {LighthouseReport} */
  if (!reportData) {
    return 0;
  }
  const numRequests =
    reportData.audits &&
    reportData.audits.diagnostics &&
    reportData.audits.diagnostics.details?.items &&
    reportData.audits.diagnostics.details?.items[0].numRequests;
  const totalByteWeight =
    reportData.audits &&
    reportData.audits.diagnostics &&
    reportData.audits.diagnostics.details?.items &&
    reportData.audits.diagnostics.details?.items[0].totalByteWeight;

  const maxRequests = 50;
  const maxByteWeight = 1024 * 1024;

  let score = 100;

  // penalty for additional requests : -5 per additionnal request
  if (numRequests > maxRequests) {
    score -= Math.min(100 / 2, (numRequests - maxRequests) * 5);
  }
  // penalty for big totalByteWeight : -20 per Mb
  if (totalByteWeight > maxByteWeight) {
    score -= Math.min(
      100 / 2,
      ((totalByteWeight - maxByteWeight) / (1024 * 1024)) * 20
    );
  }
  score = Math.max(0, score / 100);
  return score;
};

/** @param {LighthouseReport} report */
const summary = (report) => {
  /* @type {LighthouseReport} */
  const reportData = (report && Array.isArray(report) && report[0]) || report; // use first lhr report
  if (reportData && reportData.categories) {
    const lhrCategories = reportData.categories;
    if (lhrCategories["performance"]) {
      lhrCategories["performance"].score = getPerformanceScore(reportData);
    }

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
