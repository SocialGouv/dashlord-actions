const fs = require("fs");
const path = require("path");
const core = require("@actions/core");

const sampleConfig = jest
  .requireActual("fs")
  .readFileSync(path.join(__dirname, "..", "dashlord.yml"))
  .toString();

jest.mock("fs");

const { getOutputs, getSiteTools } = require("./index");

let inputs = {};

describe("should parse dashlord config", () => {
  beforeAll(() => {
    // Mock getInput
    jest.spyOn(core, "getInput").mockImplementation((name) => {
      return inputs[name];
    });
  });
  beforeEach(() => {
    // Reset inputs
    inputs = {};
  });
  test("when no input", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single invalid url input", async () => {
    inputs.url = "zfzef";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single valid url input", async () => {
    inputs.url = "https://www.free.fr";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when multiple urls input", async () => {
    inputs.url = "https://www.free.fr,pouet,http://chez.com";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("and getSiteTools http://chez.com match", async () => {
    inputs.url = "http://chez.com";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const tools = getSiteTools({
      url: "http://chez.com",
      repositories: ["chez/chez-ui", "chez/chez-api"],
      tools: {
        screenshot: false,
        updownio: false,
        stats: false,
        testssl: true,
      },
    });
    core.info(`tools=${JSON.stringify(tools)}`);
    expect(tools).toEqual({
      screenshot: false,
      nmap: true,
      zap: true,
      wappalyzer: true,
      http: true,
      testssl: true,
      lighthouse: true,
      thirdparties: true,
      nuclei: false,
      updownio: false,
      dependabot: true,
      codescan: true,
      "declaration-a11y": true,
      "declaration-rgpd": true,
      stats: false,
      404: true,
    });
  });
});
