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
    core.info(`load dashlord.yml`);
    dashlordConfig = YAML.parse(fs.readFileSync("./dashlord.yml", "utf8"));
  } else if (fs.existsSync("./dashlord.yaml")) {
    core.info(`load dashlord.yaml`);
    dashlordConfig = YAML.parse(fs.readFileSync("./dashlord.yaml", "utf8"));
  } else {
    core.error(`Cannot load dashlord.yaml`);
    throw new Error("Cannot load dashlord.yml");
  }

  const isValid = (u) => u.url.match(/^https?:\/\//);
  const urls_json = dashlordConfig.urls
    .filter(isValid)
    .filter((url) =>
      urlsInput && urlsInput.length ? urlsInput.includes(url.url) : true
    );
  const urls = urls_json.map((u) => u.url).join("\n");

  core.info(`urls :${urls}`);

  return { urls, urls_json, json: dashlordConfig };
};

async function run() {
  try {
    const outputs = getOutputs();
    core.setOutput("urls", outputs.urls); // legacy ?
    core.setOutput("urls_json", JSON.stringify(outputs.urls_json)); // useful for matrix jobs
    core.setOutput("json", JSON.stringify(outputs.json)); // full dashloard config
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === module) {
  run();
}

module.exports = { run, getOutputs };
