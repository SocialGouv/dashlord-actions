const fs = require("fs");
const core = require("@actions/core");
const YAML = require("yaml");

const getOutputs = () => {
  const urlsInput =
    core.getInput("url") &&
    core
      .getInput("url")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  core.info(`urlsInput :${urlsInput}`);

  let dashlordConfig;
  if (fs.existsSync("./dashlord.yml")) {
    core.info('----')
    core.info(`load dashlord.yml`);
    core.info('----')
    const content = fs.readFileSync("./dashlord.yml", "utf8").toString();
    core.info(content)
    dashlordConfig = YAML.parse(content);
  } else if (fs.existsSync("./dashlord.yaml")) {
    core.info(`load dashlord.yaml`);
    dashlordConfig = YAML.parse(fs.readFileSync("./dashlord.yaml", "utf8"));
  } else {
    core.error(`Cannot load dashlord.yaml`);
    throw new Error("Cannot load dashlord.yml");
  }

  core.info(JSON.stringify(dashlordConfig))

  const getSiteTools = (site) => {
    if (!dashlordConfig.tools) {
      return {}
    }
    if (!site.tools) {
      return dashlordConfig.tools;
    }
    return Object.keys(dashlordConfig.tools).reduce((siteTools, tool) => {
      // tool can be disabled at global or site level
      const isToolDisabled =
        dashlordConfig.tools[tool] === false || site.tools[tool] === false;
      return {
        ...siteTools,
        [tool]: !isToolDisabled,
      };
    }, {});
  };

  const isValid = (u) => u.url.match(/^https?:\/\//);
  const sites = dashlordConfig.urls
    .filter(isValid)
    .filter((url) =>
      urlsInput && urlsInput.length ? urlsInput.includes(url.url) : true
    )
    .map((site) => ({
      ...site,
      tools: getSiteTools(site),
    }));
  const urls = sites.map((u) => u.url).join("\n");

  core.info(`urls :${urls}`);
  core.info(`sites :${JSON.stringify(sites)}`);
  core.info(`config :${JSON.stringify(dashlordConfig)}`);

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

module.exports = { run, getOutputs };
