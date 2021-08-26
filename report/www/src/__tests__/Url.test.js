import React from "react";
import path from "path";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Url from "../components/Url";

jest.mock("../components/Gauge", () => ({ Gauge: () => <div>io</div> }));
jest.useFakeTimers("modern");
jest.setSystemTime(new Date("2021-04-06").getTime());

global.__PUBLIC_URL__ = "https://jest.demo.com/dashlord";

const report = require("../report.json").find(
  (r) => r.url === "https://adoption.gouv.fr"
);

const mockSampleConfig = JSON.parse(
  jest
    .requireActual("fs")
    .readFileSync(path.join(__dirname, "config.json"))
    .toString()
);

it("Should render empty Url", () => {
  const props = {};
  const tree = renderer.create(<Url {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Url", () => {
  const props = { report, url: "https://adoption.gouv.fr" };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Url {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Url with screenshot", () => {
  const report2 = {
    ...report,
    screenshot: true,
  };
  const props = { report: report2, url: "https://adoption.gouv.fr" };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Url {...props} />
      </MemoryRouter>
    )
    .toJSON();
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
    const props = { report };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Url {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
