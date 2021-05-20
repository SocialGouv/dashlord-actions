const fs = require("fs");
const core = require("@actions/core");

jest.mock("fs");

const { getOutputs } = require("./index");

const sampleConfig = `
title: Test 1
urls:
  - url: https://www.free.fr
    title: Free
    repositories:
      - iliad/free-ui
      - iliad/free-api
  - url: invalid-url
  - url: http://chez.com
    repositories:
      - chez/chez-ui
      - chez/chez-api
  - url: https://voila.fr
`;

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
    expect(outputs.urls_json).toMatchSnapshot();
  });

  test("when single invalid url input", async () => {
    inputs.url = 'zfzef'
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.urls_json).toMatchSnapshot();
  });

  test("when single valid url input", async () => {
    inputs.url = 'https://www.free.fr'
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.urls_json).toMatchSnapshot();
  });

    test("when multiple urls input", async () => {
    inputs.url = 'https://www.free.fr,pouet,http://chez.com';
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.urls_json).toMatchSnapshot();
  });

});
