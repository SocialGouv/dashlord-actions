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

const getOutputs = () => {
  const urlsInput =
    core.getInput("url") &&
    core
      .getInput("url")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const toolInput = core.getInput("tool") && core.getInput("tool").trim();
  const tagsInput = 
    core.getInput("tags") &&
    core
      .getInput("tags")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  core.info(`urlsInput: ${urlsInput}`);
  core.info(`toolInput: ${toolInput}`);
  core.info(`tagsInput: ${tagsInput}`);

  const isValid = (u) => u.url.match(/^https?:\/\//);
  let dashlordConfig = getDashlordConfig();
  let baseSites = dashlordConfig.urls;

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
      dashlordConfig.urls && urlsInput && urlsInput.length
        ? urlsInput.includes(site.url)
        : true
    )
    .filter((site) =>
      tagsInput && tagsInput.length
        ? site.tags && site.tags.some((t) => tagsInput.includes(t))
        : true
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
    const outputs = getOutputs();
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
