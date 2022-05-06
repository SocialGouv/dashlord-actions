/** @param {BetagouvReport} report */
const summary = (report) => {
    let seCurrentPhase;
    if (report?.attributes.phases.length) {
        seCurrentPhase = report.attributes.phases.sort((a, b) => b.start.localeCompare(a.start))[0].name;
    }
    return {
        seCurrentPhase,
    };
};

module.exports = summary;
