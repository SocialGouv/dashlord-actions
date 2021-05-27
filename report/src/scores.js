const scores = {
    /** @param {CodescanReport} data */
    codescanalerts: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {DependabotReport} data */
    dependabotalerts: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {HttpReport} data */
    http: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {LighthouseReport} data */
    lhr: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {NmapReport} data */
    nmapvuln: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {NucleiReport} data */
    nuclei: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {SslTestReport} data */
    testssl: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {ThirdPartiesReport} data */
    thirdparties: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {UpDownReport} data */
    updownio: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {WappalyzerReport} data */
    wappalyzer: (data) => {
        if (data) {
            // compute score
        }
    },
    /** @param {ZapReport} data */
    zap: (data) => {
        if (data) {
            // compute score
        }
    }
};

/**
 * @param {UrlReport} toolData
 * @param {string} tool
 *
 * @returns {string|number|undefined}
 */
const computeScore = (toolData, tool) => {
  return 0;
};

/** @param {UrlReport} toolsData */
const computeScores = (toolsData) => {
  return Object.keys(toolsData).reduce(
      //@ts-expect-error
    (keys, key) => ({ ...keys, [key]: computeScore(keys[key], key) }),
    /** @type {DashlordReport} */
    {} 
  );
};
module.exports = { computeScores };
