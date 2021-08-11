// compute a performance score from 0 to 100 from lighthouse report
export var getPerformanceScore = function (report) {
  let _a;
  let _b;
  let _c;
  let _d;
  const numRequests =
    ((_a = report.audits.diagnostics.details) === null || _a === void 0
      ? void 0
      : _a.items) &&
    ((_b = report.audits.diagnostics.details) === null || _b === void 0
      ? void 0
      : _b.items[0].numRequests);
  const totalByteWeight =
    ((_c = report.audits.diagnostics.details) === null || _c === void 0
      ? void 0
      : _c.items) &&
    ((_d = report.audits.diagnostics.details) === null || _d === void 0
      ? void 0
      : _d.items[0].totalByteWeight);
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
