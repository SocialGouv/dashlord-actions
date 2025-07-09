//@ts-check
const fs = require("fs");
const path = require("path");
const core = require("@actions/core");

const sampleConfig = jest
  .requireActual("fs")
  .readFileSync(path.join(__dirname, "..", "dashlord.yml"))
  .toString();

jest.mock("fs", () => ({
  promises: {
    access: jest.fn(),
  },
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

const { getOutputs, getSiteTools, getSiteSubpages } = require("./index");

describe("should parse dashlord config", () => {
  beforeEach(() => {
    core.__resetInputsObject();
  });

  test("when no input", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = await getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single invalid url input", async () => {
    core.__setInputsObject({ url: "zfzef" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = await getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single valid url input", async () => {
    core.__setInputsObject({ url: "https://www.free.fr" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = await getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when multiple urls input", async () => {
    core.__setInputsObject({
      url: "https://www.free.fr,pouet,http://chez.com",
    });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = await getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("and getSiteTools https://chez.com match", async () => {
    core.__setInputsObject({ url: "https://chez.com" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const tools = getSiteTools({
      url: "https://chez.com",
      repositories: ["chez/chez-ui", "chez/chez-api"],
      tools: {
        screenshot: false,
        updownio: false,
        stats: false,
        budget_page: false,
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
      budget_page: false,
      404: true,
      dsfr: true,
      ecoindex: true,
    });
  });

  test("and getSiteSubpages https://chez.com match", async () => {
    core.__setInputsObject({ url: "https://chez.com" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const subpages = getSiteSubpages({
      url: "https://chez.com",
      pages: ["login", "profile"],
      repositories: ["chez/chez-ui", "chez/chez-api"],
      tools: {
        screenshot: false,
        updownio: false,
        stats: false,
        budget_page: false,
        testssl: true,
      },
    });
    core.info(`subpages=${JSON.stringify(subpages)}`);
    expect(subpages).toEqual([
      "https://chez.com",
      "https://chez.com/login",
      "https://chez.com/profile",
    ]);
  });

  test("and getSiteSubpages https://voila.fr match", async () => {
    core.__setInputsObject({ url: "https://voila.fr" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const subpages = getSiteSubpages({
      url: "https://voila.fr",
    });
    core.info(`subpages=${JSON.stringify(subpages)}`);
    expect(subpages).toEqual(["https://voila.fr"]);
  });

  test("with inputs.tool", async () => {
    core.__setInputsObject({ url: "https://voila.fr", tool: "lighthouse" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = await getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });
});

describe("inputs.incubator: fetch urls from beta API", () => {
  test("should add unknown URLS", async () => {
    // test if we get API entries
    core.__setInputsObject({ incubator: "sgmas" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(`
tools:
  lighthouse: true
  nmap: false
urls: []
`);
    const outputs = await getOutputs();
    expect(outputs.urls).toMatch(/https:\/\/code.travail.gouv.fr/);
    expect(outputs.sites.length).toBeGreaterThan(1);
    expect(outputs.sites.find((s) => s.betaId === "codedutravail")).toEqual({
      betaId: "codedutravail",
      subpages: ["https://code.travail.gouv.fr"],
      repositories: ["https://github.com/SocialGouv/code-du-travail-numerique"],
      tools: { lighthouse: true, nmap: false },
      url: "https://code.travail.gouv.fr",
    });
  });

  test("should use existing config if already exist", async () => {
    // test if API entries dont overwrite local configs
    core.__setInputsObject({ incubator: "sgmas" });
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(`
tools:
  lighthouse: true
  nmap: false
urls:
  - url: "https://test.com"
    betaId: "codedutravail"
    tools:
      nmap: true
`);
    const outputs = await getOutputs();
    expect(outputs.urls).toMatch(/^https:\/\/test.com/);
    expect(outputs.sites.length).toBeGreaterThan(1);
    expect(outputs.sites[0]).toEqual({
      betaId: "codedutravail",
      subpages: ["https://test.com"],
      tools: { lighthouse: true, nmap: true },
      url: "https://test.com",
    });
  });
});
