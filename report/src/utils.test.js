// @ts-nocheck

const fs = require("fs");
const { toHostname, getUrls } = require("./utils");

jest.mock("fs");

const tests = [
  ["http://www.free.fr", "www.free.fr"],
  ["http://sub.www.free.fr", "sub.www.free.fr"],
  ["http://free.fr/some/page", "free.fr"],
  ["free.fr/some/page", "free.fr"],
  ["/some/page", null],
];

describe("toHostname", () => {
  tests.forEach(([input, output]) => {
    test(`should extract ${output} in ${input}`, () => {
      //@ts-ignore
      expect(toHostname(input)).toEqual(output);
    });
  });
});

const sampleConfig = `
title: Dashboard title
urls:
  - url: https://www.free.fr
    title: Homepage free.fr
    tags:
      - telecom
      - provider
  - url: https://www.voila.fr
    title: something
    tags:
      - oldie
`;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("getUrls", () => {
  test("should parse urls.txt files correctly", () => {
    fs.existsSync
      //@ts-expect-error
      .mockImplementationOnce(() => false) // yaml
      .mockImplementationOnce(() => false) // yml
      .mockImplementationOnce(() => true); // txt

    fs.readFileSync.mockReturnValueOnce(`

url1
url2
# comment
url3

`);

    expect(getUrls()).toEqual([
      { url: "url1" },
      { url: "url2" },
      { url: "url3" },
    ]);
  });

  test("should parse dashlord.yaml file correctly", () => {
    fs.existsSync
      //@ts-expect-error
      .mockImplementationOnce(() => true) // yaml
      .mockImplementationOnce(() => false) // yml
      .mockImplementationOnce(() => false); //txt

    fs.readFileSync.mockReturnValueOnce(sampleConfig);

    expect(getUrls()).toMatchSnapshot();
  });

  test("should parse dashlord.yml file correctly", () => {
    fs.existsSync
      //@ts-expect-error
      .mockImplementationOnce(() => false) // yaml
      .mockImplementationOnce(() => true) // yml
      .mockImplementationOnce(() => false); //txt

    fs.readFileSync.mockReturnValueOnce(sampleConfig);

    expect(getUrls()).toMatchSnapshot();
  });
});
