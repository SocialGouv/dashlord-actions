import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Url } from "../components/Url";

jest.mock("../components/Gauge", () => ({ Gauge: () => <div>io</div> }));
jest.useFakeTimers("modern");
jest.setSystemTime(new Date("2021-04-06").getTime());

const report = require("../report.json").find(
  (r) => r.url === "https://www.fabrique.social.gouv.fr"
);

it("Should render empty Url", () => {
  const props = {};
  const tree = renderer.create(<Url {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Url", () => {
  const props = { report, url: "https://www.fabrique.social.gouv.fr" };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Url {...props} />{" "}
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
  const props = { report: report2, url: "https://www.fabrique.social.gouv.fr" };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Url {...props} />{" "}
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Tools config", () => {
  beforeEach(() => {
    jest.mock("../config.json", () => ({
      tools: ["http", "zap"],
    }));
  });

  it("Should render Url with limited tools", () => {
    const props = { report };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Url {...props} />{" "}
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
