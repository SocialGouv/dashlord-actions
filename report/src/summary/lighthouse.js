const {scoreToGrade} = require("../utils");

// compute a performance score from 0 to 100 from lighthouse report
/**
 * @param {LighthouseReport[]} report
 *
 * @returns {number}
 */
const getPerformanceScore = (report) => {
  const numRequests =
    report[0].audits &&
    report[0].audits.diagnostics &&
    report[0].audits.diagnostics.details?.items &&
    report[0].audits.diagnostics.details?.items[0].numRequests;
  const totalByteWeight =
    report[0].audits &&
    report[0].audits.diagnostics &&
    report[0].audits.diagnostics.details?.items &&
    report[0].audits.diagnostics.details?.items[0].totalByteWeight;

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


/** @param {LighthouseReport[]} report */
const summary = (report) => {
  if (report[0] && report[0].categories) {
    const lhrCategories = report[0].categories;
    if (lhrCategories["performance"]) {
      lhrCategories["performance"].score = getPerformanceScore(report);
    }

    return Object.keys(lhrCategories).reduce((scores, key) => {
      //@ts-expect-error
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
