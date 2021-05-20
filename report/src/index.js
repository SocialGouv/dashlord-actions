const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const omit = require("lodash.omit");
const YAML = require("yaml");

const { getUrls, readFile, writeFile } = require("./utils");

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
    console.error("e", e);
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
  result
    .map((r) => omit(r, ["request", "response"]))
    .filter((entry) => entry.host === url);

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
  const newCategories = Object.keys(categories).reduce(
    (
      a,
      /** @type {LighthouseReportCategoryKey} */
      key
    ) => ({
      ...a,

      [key]: omit(categories[key], "auditRefs"),
    }),
    {}
  );
  return {
    requestedUrl,
    finalUrl,
    fetchTime,
    runWarnings,
    categories: newCategories,
    audits: pick(audits, ["metrics", "diagnostics"]),
  };
};

const cleanups = {
  nuclei: nucleiCleanup,
  zap: zapCleanup,
  lhr: lhrCleanup,
};

/**
 * Minify Lighthouse JSON data
 *
 * @returns {DashLordReport} Full DashLoard report as JSON
 */
const generateReport = () => {
  const urls = getUrls()
    .map((url) => {
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
        const latestFiles = fs.readdirSync(latestFilesPath);
        /** @type {UrlReport} */
        const urlData = {
          ...url,
          http: requireJson(path.join(latestFilesPath, "http.json")),
          updownio: requireJson(path.join(latestFilesPath, "updownio.json")),
          nmap: requireJson(path.join(latestFilesPath, "nmapvuln.json")),
          dependabot: requireJson(
            path.join(latestFilesPath, "dependabotalerts.json")
          ),
          codescan: requireJson(
            path.join(latestFilesPath, "codescanalerts.json")
          ),
          testssl: requireJson(path.join(latestFilesPath, "testssl.json")),
          thirdparties: requireJson(
            path.join(latestFilesPath, "thirdparties.json")
          ),
          wappalyzer: requireJson(
            path.join(latestFilesPath, "wappalyzer.json")
          ),
          zap: cleanups.zap(
            requireJson(path.join(latestFilesPath, "zap.json"))
          ),
          nuclei: cleanups.nuclei(
            requireJson(path.join(latestFilesPath, "nuclei.json")),
            url.url
          ),
          lhr: cleanups.lhr(
            requireJson(path.join(latestFilesPath, "lhr.json"))
          ),
          screenshot: fs.existsSync(
            path.join(latestFilesPath, "screenshot.jpeg")
          ),
        };

        // copy lhr, zap and testssl.sh static reports
        const publicReportsUrlPath = path.join(
          "www",
          "public",
          "report",
          urlb64
        );

        fs.mkdirSync(publicReportsUrlPath, { recursive: true });

        /** @type {DashlordConfig} */
        let dashlordConfig = {
          title: "DashLord report",
          urls: [],
        };
        if (fs.existsSync(path.join(DASHLORD_REPO_PATH, "dashlord.yaml"))) {
          dashlordConfig = YAML.parse(
            readFile(path.join(DASHLORD_REPO_PATH, "dashlord.yaml"))
          );
        } else if (
          fs.existsSync(path.join(DASHLORD_REPO_PATH, "dashlord.yml"))
        ) {
          dashlordConfig = YAML.parse(
            readFile(path.join(DASHLORD_REPO_PATH, "dashlord.yml"))
          );
        }

        // copy dashlord config YAML as JSON for the report
        writeFile(
          path.join("www", "src", "config.json"),
          JSON.stringify(dashlordConfig)
        );

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

        return urlData;
      } else {
        console.error(`Cannot find folder for ${url.url}`);
        return null;
      }
    })
    .filter((x) => x !== null);
  /** @ts-expect-error #TODO #WTH */
  return urls;
};

if (require.main === module) {
  const report = generateReport();
  console.log(JSON.stringify(report, null, 2));
}
