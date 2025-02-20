const fs = require("fs");
const core = require("@actions/core");
const YAML = require("yaml");

const getDashlordConfig = () => {
  let dashlordConfig;
  if (fs.existsSync("./dashlord.yml")) {
    core.info("----");
    core.info(`load dashlord.yml`);
    core.info("----");
    const content = fs.readFileSync("./dashlord.yml", "utf8").toString();
    core.info(content);
    dashlordConfig = YAML.parse(content);
  } else if (fs.existsSync("./dashlord.yaml")) {
    core.info(`load dashlord.yaml`);
    dashlordConfig = YAML.parse(fs.readFileSync("./dashlord.yaml", "utf8"));
  } else {
    core.error(`Cannot load dashlord.yaml`);
    throw new Error("Cannot load dashlord.yml");
  }

  core.info(JSON.stringify(dashlordConfig));
  return dashlordConfig;
};

const getSiteTools = (site) => {
  core.info(`site=${JSON.stringify(site)}`);
  core.info(`site.tools=${JSON.stringify(site.tools)}`);
  let dashlordConfig = getDashlordConfig();
  if (!dashlordConfig.tools) {
    return {};
  }
  if (!site.tools) {
    return dashlordConfig.tools;
  }
  return Object.keys(dashlordConfig.tools).reduce((siteTools, tool) => {
    // tool status can be set at global or site level, if defined at site level and global then site level wins.
    const isToolDisabled =
      site.tools[tool] === undefined
        ? dashlordConfig.tools[tool] === false
        : site.tools[tool] === false;
    return {
      ...siteTools,
      [tool]: !isToolDisabled,
    };
  }, {});
};

const getSiteSubpages = (site) => {
  core.info(`site=${JSON.stringify(site)}`);
  core.info(`site.pages=${JSON.stringify(site.pages)}`);
  const subpages = [site.url.replace(/\/$/, "")];
  if (site.pages !== undefined) {
    subpages.push(
      ...site.pages.map((page) =>
        [site.url.replace(/\/$/, ""), page.replace(/^\//, "")].join("/")
      )
    );
  }
  return subpages;
};

const getStartupsFromApi = async (id) => {
  const allStartups = await fetch("https://beta.gouv.fr/api/v2.6/startups.json")
    .then((r) => r.json())
    .then((r) => r.data);
  return fetch("https://beta.gouv.fr/api/v2.6/incubators.json")
    .then((r) => r.json())
    .then((r) =>
      r[id].startups
        .map((se) => allStartups.find((s) => s.id === se.id))
        .filter(Boolean)
    )
    .then((se) =>
      se.map((s) => ({
        link: s.attributes.link,
        repository: s.attributes.repository,
        id: s.id,
      }))
    );
};

const getOutputs = async () => {
  const urlsInput =
    core.getInput("url") &&
    core
      .getInput("url")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const toolInput = core.getInput("tool") && core.getInput("tool").trim();
  const incubator = core.getInput("incubator");

  core.info(`incubator:${incubator}`);
  core.info(`urlsInput: ${urlsInput}`);
  core.info(`toolInput: ${toolInput}`);

  const isValid = (u) => u.url.match(/^https?:\/\//);
  let dashlordConfig = getDashlordConfig();
  let baseSites = dashlordConfig.urls;

  if (incubator) {
    const incubatorProducts = await getStartupsFromApi(incubator);
    core.info(`incubatorProducts: ${incubatorProducts.length}`);
    const dashlordBetaIds = baseSites.map((b) => b.betaId);
    const dashlordUrls = baseSites.map((b) => b.url);
    core.info(`dashlordBetaIds: ${dashlordBetaIds}`);
    // add urls from API
    incubatorProducts
      // if not detected as betaId
      .filter((p) => !dashlordBetaIds.includes(p.id))
      // if not detected as URL
      .filter((p) => !dashlordUrls.includes(p.link))
      .forEach((p) => {
        const url = p.link.replace(/(\/)$/, "");
        baseSites.push({ url, betaId: p.id, repositories: [p.repository] });
      });
  }

  if (!baseSites && urlsInput) baseSites = urlsInput.map((url) => ({ url }));

  if (
    toolInput &&
    toolInput !== "all" &&
    !Object.keys(dashlordConfig.tools).includes(toolInput)
  ) {
    throw new Error(`Tool not found : ${toolInput}`);
  }

  const sites = baseSites
    .filter(isValid)
    .filter((site) =>
      urlsInput && urlsInput.length ? urlsInput.includes(site.url) : true
    )
    .map((site) => ({
      ...site,
      tools:
        toolInput && toolInput !== "all"
          ? { [toolInput]: true }
          : getSiteTools(site),
      subpages: getSiteSubpages(site),
    }));

  const urls = sites.map((u) => u.url).join("\n");

  core.info(`urls :${urls}`);
  core.info(`sites: ${JSON.stringify(sites)}`);
  core.info(`config: ${JSON.stringify(dashlordConfig)}`);

  return { urls, sites, config: dashlordConfig };
};

async function run() {
  try {
    const outputs = await getOutputs();
    core.setOutput("urls", outputs.urls); // legacy ?
    core.setOutput("sites", JSON.stringify(outputs.sites)); // useful for matrix jobs
    core.setOutput("config", JSON.stringify(outputs.config)); // full dashloard config
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  run,
  getOutputs,
  getDashlordConfig,
  getSiteTools,
  getSiteSubpages,
};
