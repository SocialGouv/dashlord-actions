/** @param {BetagouvReport} report */
const summary = (report) => {
    if (report?.attributes.phases.length) {
        const seCurrentPhase = report.attributes.phases.sort((a, b) => b.start.localeCompare(a.start))[0];
        return {
            seCurrentPhase: convertPhaseToGrade(seCurrentPhase.name)
        };
    }
};

/** @param {string} phase */
function convertPhaseToGrade(phase) {
    switch (phase) {
        case "investigation":
            return "Investigation";
        case "construction":
            return "Construction";
        case "acceleration":
            return "Accélération";
        case "success":
            return "Succès";
        default:
            return phase
    }
}

module.exports = summary;
