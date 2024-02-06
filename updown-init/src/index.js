const fs = require("fs");
const core = require("@actions/core");
const YAML = require("yaml");
const { createMissingUpdownEntries } = require("./updown");

async function run() {
  core.info("----");
  const content = fs.readFileSync("./dashlord.yml", "utf8").toString();
  /** @type {DashLordConfig} */
  const dashlordConfig = YAML.parse(content);

  if (process.env.UPDOWNIO_API_KEY) {
    console.log("init: create missing updown.io entries");
    await createMissingUpdownEntries(dashlordConfig);
  } else {
    throw new Error("missing env.UPDOWNIO_API_KEY");
  }
}

if (require.main === module) {
  run();
}
