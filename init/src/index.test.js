const fs = require("fs");
const path = require("path");
const core = require("@actions/core");

const sampleConfig = jest.requireActual('fs').readFileSync(path.join(__dirname, "..", "dashlord.yml")).toString()

jest.mock("fs");

const { getOutputs } = require("./index");
 
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
    inputs.url = 'zfzef'
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single valid url input", async () => {
    inputs.url = 'https://www.free.fr'
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

    test("when multiple urls input", async () => {
    inputs.url = 'https://www.free.fr,pouet,http://chez.com';
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

});
