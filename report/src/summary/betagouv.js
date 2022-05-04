/** @param {BetagouvReport} report */
const summary = (report) => {
    if (report?.attributes.phases.length) {
        const seCurrentPhase = report.attributes.phases.sort((a, b) => b.start.localeCompare(a.start))[0];
        return {
            seCurrentPhase: seCurrentPhase.name
        };
    }
};

module.exports = summary;
