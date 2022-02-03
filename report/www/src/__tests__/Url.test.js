import React from "react";
import path from "path";
import * as renderer from "react-test-renderer";

import { Url } from "../components/Url";

jest.mock("../components/Gauge", () => ({
  Gauge: () => <div>gauge mock</div>,
}));
jest.useFakeTimers("modern");
jest.setSystemTime(new Date("2021-04-06").getTime());

const TEST_URL = "https://www.fabrique.social.gouv.fr";

const report = require("../report.json").find((r) => r.url === TEST_URL);

const mockSampleConfig = JSON.parse(
  jest
    .requireActual("fs")
    .readFileSync(path.join(__dirname, "config.json"))
    .toString()
);

it("Should render empty Url", () => {
  const props = { url: "https://some.url" };
  const tree = renderer.create(<Url {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Url", () => {
  const props = { report, url: TEST_URL };
  const tree = renderer.create(<Url {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Url with screenshot", () => {
  const report2 = {
    ...report,
    screenshot: true,
  };
  const props = { report: report2, url: TEST_URL };
  const tree = renderer.create(<Url {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Tools config", () => {
  beforeEach(() => {
    jest.mock("../config.json", () => ({
      ...mockSampleConfig,
      tools: { http: false, zap: true, lighthouse: false },
    }));
  });

  it("Should render Url with limited tools", () => {
    const props = { report, url: TEST_URL };
    const tree = renderer.create(<Url {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
