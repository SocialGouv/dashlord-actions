/** @param { number} count */
const getGradeOpenPorts = (count) => {
  return count > 2 ? "F" : "A";
};

/** @param {NmapReport} report */
const summary = (report) => {
  if (report) {
    const nmapGrade = report.grade;
    const nmapOpenPortsCount = report.open_ports && report.open_ports.length;
    const nmapOpenPortsGrade = getGradeOpenPorts(nmapOpenPortsCount);
    if (nmapGrade) {
      return {
        nmapGrade,
        nmapOpenPortsCount,
        nmapOpenPortsGrade,
      };
    }
  }
};

module.exports = summary;
