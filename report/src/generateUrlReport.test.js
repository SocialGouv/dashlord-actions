// @ts-nocheck

const fs = require("fs");
const generateUrlReport = require("./generateUrlReport");

jest.mock("fs");

const testUrl = "https://www.test.com";
const b64 = "aHR0cHM6Ly93d3cudGVzdC5jb20=";

// mock a json in the latest scan
const mockJson = (name, data) =>
  jest.mock(
    `results/${b64}/${name}`,
    () =>
      data
        ? data
        : {
            data: name,
          },
    { virtual: true }
  );

// for some reason jest.resetModules doesnt work with virtual JSON mocks
const unMockJson = (name) => {
  jest.unmock(`results/${b64}/${name}`);
};

describe("generateUrlReport", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test(`should return null on invalid url`, () => {
    expect(
      generateUrlReport({
        url: "https://www.invalid.com",
      })
    ).toEqual(null);
  });

  test(`should generate latest report for a valid url`, () => {
    fs.existsSync.mockImplementationOnce(() => true); // check url folder
    fs.existsSync.mockImplementationOnce(() => false); // screenshot
    fs.readdirSync.mockImplementationOnce(() => [
      "lhr-xxxx.html",
      "lhr-yyyy.html",
      "aaaa.html",
    ]); // lhr

    // mock all required files
    mockJson("codescanalerts.json", {
      report: "codescanalerts.json",
      totalCount: 42,
    });
    mockJson("dependabotalerts.json", { report: "dependabotalerts.json" });
    mockJson("http.json", { report: "http.json" });
    mockJson("lhr.json", ["dsfsdfqdf"]);
    mockJson("lhr-dsfsdfqdf.json", { report: "lhr-dsfsdfqdf.json" });
    mockJson("nmapvuln.json", { report: "nmap.json" });
    mockJson("nuclei.json", [{ report: "nuclei.json" }]);
    mockJson("testssl.json", [{ report: "testssl.json" }]);
    mockJson("thirdparties.json", { report: "thirdparties.json" });
    mockJson("updownio.json", { report: "updownio.json" });
    mockJson("wappalyzer.json", { report: "wappalyzer.json" });
    mockJson("zap.json", { report: "zap.json" });
    mockJson("stats.json", { report: "stats.json" });
    mockJson("budget_page.json", { report: "budget_page.json" });
    mockJson("github_repository.json", { report: "github_repository.json" });
    mockJson("404.json", { broken: [1, 2, 3] });
    mockJson("declaration-a11y.json", {
      mention: "Accessibilité : partiellement conforme",
    });
    mockJson("declaration-rgpd.json", [
      {
        slug: "ml",
        declarationUrl: "https://declaration-ml.test",
        maxScore: 4,
        score: 3,
      },
      {
        slug: "pc",
        declarationUrl: "https://declaration-pc.test",
        maxScore: 4,
        score: 3,
      },
    ]);

    mockJson("sonarcloud.json", [
      {
        repo: "sensgithub/eHospital",
        result: {
          name: "main",
          isMain: true,
          type: "LONG",
          status: {
            bugs: 174,
            vulnerabilities: 23,
            codeSmells: 2198,
          },
          analysisDate: "2023-04-03T01:37:49+0200",
          commit: {
            sha: "28f2cf43a343f5215ffa1052d9c659333626a2a4",
            date: "2023-04-03T01:37:44+0200",
            message: "Delete codeql.yml",
          },
        },
      },
      {
        repo: "zabbix/zabbix",
        result: {
          name: "master",
          isMain: true,
          type: "LONG",
          status: {
            qualityGateStatus: "ERROR",
            bugs: 73,
            vulnerabilities: 26,
            codeSmells: 13669,
          },
          analysisDate: "2023-04-02T02:17:15+0200",
          commit: {
            sha: "f9d2062ed6560094ad6f4c8772cd82b72328cd83",
            date: "2023-03-31T21:45:03+0200",
            message:
              ".......... [ZBX-1357] automatic update of translation strings",
          },
        },
      },
    ]);

    expect(
      generateUrlReport({
        url: testUrl,
      })
    ).toMatchSnapshot();

    // unmock all required files
    unMockJson("codescanalerts.json");
    unMockJson("dependabotalerts.json");
    unMockJson("http.json");
    unMockJson("lhr.json");
    unMockJson("lhr-dsfsdfqdf.json");
    unMockJson("nmapvuln.json");
    unMockJson("nuclei.json", []);
    unMockJson("testssl.json");
    unMockJson("thirdparties.json");
    unMockJson("updownio.json");
    unMockJson("wappalyzer.json");
    unMockJson("zap.json");
    unMockJson("stats.json");
    unMockJson("budget_page.json");
    unMockJson("github_repository.json");
    unMockJson("404.json");
    unMockJson("declaration-a11y.json");
    unMockJson("declaration-rgpd.json");
    unMockJson("sonarcloud.json");
  });
  test(`should allow empty/invalid reports`, () => {
    fs.existsSync.mockImplementationOnce(() => true); // check url folder
    fs.existsSync.mockImplementationOnce(() => false); // screenshot
    fs.readdirSync.mockImplementationOnce(() => [
      "lhr-xxxx.html",
      "lhr-yyyy.html",
      "aaaa.html",
    ]); // lhr
    mockJson("codescanalerts.json");
    mockJson("wappalyzer.json");

    expect(
      generateUrlReport({
        url: testUrl,
      })
    ).toMatchSnapshot();

    unMockJson("codescanalerts.json");
    unMockJson("wappalyzer.json");
  });

  test(`should detect screenshot if any`, () => {
    fs.existsSync.mockImplementationOnce(() => true); // check url folder
    fs.existsSync.mockImplementationOnce(() => true); // screenshot
    fs.readdirSync.mockImplementationOnce(() => [
      "lhr-xxxx.html",
      "lhr-yyyy.html",
      "aaaa.html",
    ]); // lhr

    expect(
      generateUrlReport({
        url: testUrl,
      }).screenshot
    ).toEqual(true);
  });
});
