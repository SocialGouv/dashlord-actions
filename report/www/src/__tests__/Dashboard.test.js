import path from "path";
import * as React from "react";
import * as renderer from "react-test-renderer";

import { Dashboard } from "../components/Dashboard";

import report from "../report.json";

const mockSampleConfig = JSON.parse(
  jest
    .requireActual("fs")
    .readFileSync(path.join(__dirname, "config.json"))
    .toString()
);

// prevent empty table due to resize detection
jest.mock(
  "react-virtualized-auto-sizer",
  () =>
    ({ children }) =>
      children({ width: 1000, height: 1000 })
);

it("Should render empty Dashboard", () => {
  const props = {};
  const tree = renderer.create(<Dashboard {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Dashboard", () => {
  const props = { report };
  const tree = renderer.create(<Dashboard {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Tools config", () => {
  beforeEach(() => {
    jest.mock("../config.json", () => ({
      ...mockSampleConfig,
      tools: { http: false, zap: true, lighthouse: false },
    }));
  });

  it("Should render Dashboard with limited tools", () => {
    const props = { report };
    const tree = renderer.create(<Dashboard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
