/** @param {number} count */
const getGradeTrackers = (count) => {
  return count > 10 ? "F" : count > 2 ? "C" : count > 0 ? "B" : "A";
};

/** @param {number} count */
const getGradeCookies = (count) => {
  return count > 10
    ? "F"
    : count > 5
    ? "E"
    : count > 2
    ? "C"
    : count > 0
    ? "B"
    : "A";
};

/** @param {ThirdPartiesReport} report */
const summary = (report) => {
  if (report) {
    const trackersCount = report.trackers && report.trackers.length;
    const trackersGrade = report.trackers && getGradeTrackers(trackersCount);
    const cookiesCount = report.cookies && report.cookies.length;
    const cookiesGrade = report.cookies && getGradeCookies(cookiesCount);
    if (cookiesCount !== undefined) {
      return {
        cookiesGrade,
        cookiesCount,
        trackersGrade,
        trackersCount,
      };
    }
  }
};

module.exports = summary;
