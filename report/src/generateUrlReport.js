const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const omit = require("lodash.omit");

const { computeSummary } = require("./summary");

const DASHLORD_REPO_PATH = process.env.DASHLORD_REPO_PATH || ".";

/**
 * Try to require some JSON
 *
 * @param {string} jsonPath The full path to file
 *
 * @returns {any} JSON content
 */
const requireJson = (jsonPath) => {
  try {
    return require(jsonPath);
  } catch (e) {
    console.error(`error loading ${jsonPath}`);
    return null;
  }
};

/**
 * Minify zap JSON data
 *
 * @param {ZapReport} result ZAP JSON content
 *
 * @returns {ZapReport} minified JSON content
 */
const zapCleanup = (result) =>
  result && {
    ...result,
    site:
      result &&
      result.site &&
      result.site.map &&
      result.site.map((site) => {
        return {
          ...site,
          alerts: site.alerts.map((result) =>
            pick(result, ["name", "riskcode", "confidence", "riskdesc", "desc"])
          ),
        };
      }),
  };

/**
 * Minify nuclei JSON data
 *
 * @param {NucleiReport} result nuclei JSON content
 * @param {string} url extract only for this url
 *
 * @returns {NucleiReport} minified JSON content
 */
const nucleiCleanup = (result, url) =>
  result &&
  result.map &&
  result
    .map((r) => omit(r, ["request", "response"]))

/**
 * Minify Lighthouse JSON data
 *
 * @param {LighthouseReport} result Lighthouse JSON content
 *
 * @returns {LighthouseReport|null} minified JSON content
 */
const lhrCleanup = (result) => {
  if (!result) {
    return null;
  }
  const {
    requestedUrl,
    finalUrl,
    fetchTime,
    runWarnings,
    categories,
    audits,
  } = result;

  /** @type {LighthouseReportCategories} */
  // @ts-ignore
  const newCategories =
    (categories &&
      Object.keys(categories).reduce(
        (
          a,
          /** @type {LighthouseReportCategoryKey} */
          key
        ) => ({
          ...a,

          [key]: omit(categories[key], "auditRefs"),
        }),
        {}
      )) ||
    {};
  return {
    requestedUrl,
    finalUrl,
    fetchTime,
    runWarnings,
    categories: newCategories,
    audits: pick(audits, ["metrics", "diagnostics"]),
  };
};

//@ts-expect-error
const requireToolData = (filename) => (basePath) =>
  requireJson(path.join(basePath, filename));

const tools = {
  http: { data: requireToolData("http.json") },
  updownio: { data: requireToolData("updownio.json") },
  nmap: { data: requireToolData("nmapvuln.json") },
  dependabot: { data: requireToolData("dependabotalerts.json") },
  codescan: { data: requireToolData("codescanalerts.json") },
  testssl: { data: requireToolData("testssl.json") },
  thirdparties: { data: requireToolData("thirdparties.json") },
  wappalyzer: { data: requireToolData("wappalyzer.json") },
  zap: { data: requireToolData("zap.json"), cleanup: zapCleanup },
  nuclei: { data: requireToolData("nuclei.json"), cleanup: nucleiCleanup },
  lhr: { data: requireToolData("lhr.json"), cleanup: lhrCleanup },
  screenshot: {
    /** @param {string} basePath scan directory */
    data: (basePath) => fs.existsSync(path.join(basePath, "screenshot.jpeg")),
  },
};

//@ts-expect-error
const noop = (args) => args;

/**
 * Compile report for a single URL
 *
 * @param {UrlConfig} url URL to compile results for
 *
 * @returns {UrlReport|null} compiled data
 */
const generateUrlReport = (url) => {
  const urlb64 = Buffer.from(url.url).toString("base64");
  const urlPath = path.join(DASHLORD_REPO_PATH, "results", urlb64);
  if (fs.existsSync(urlPath)) {
    // use filesystem to determine latest scan report
    const scans = fs.readdirSync(urlPath);
    scans.sort().reverse();
    const lastScan = scans.length && scans[0];
    if (!lastScan) {
      return null;
    }
    const latestFilesPath = path.join(urlPath, lastScan);

    // compile all tools data
    /** @type {UrlReport} toolsData */
    //@ts-expect-error
    const toolsData = Object.keys(tools).reduce(
      (keys, key) => {
        //@ts-expect-error
        const data = (tools[key].cleanup || noop)(
          //@ts-expect-error
          tools[key].data(latestFilesPath, url),
          url
        );
        return {
          ...keys,
          [key]: data,
        };
      },
      { url: url.url }
    );

    const urlData = {
      ...url,
      ...toolsData,
      summary: computeSummary(toolsData),
    };

    // copy lhr, zap and testssl.sh static reports
    const publicReportsUrlPath = path.join("www", "public", "report", urlb64);

    fs.mkdirSync(publicReportsUrlPath, { recursive: true });

    /**
     *
     * @param {string} name file name to export to public website
     *
     * @returns {void}
     */
    const copyForWebsite = (name) => {
      if (fs.existsSync(path.join(latestFilesPath, name))) {
        fs.createReadStream(path.join(latestFilesPath, name)).pipe(
          fs.createWriteStream(path.join(publicReportsUrlPath, name))
        );
      }
    };

    copyForWebsite("lhr.html");
    copyForWebsite("testssl.html");
    copyForWebsite("zap.html");
    copyForWebsite("screenshot.jpeg");
    copyForWebsite("nmapvuln.html");

    return urlData;
  } else {
    console.error(`Cannot find folder for ${url.url}`);
    return null;
  }
};

module.exports = generateUrlReport;
