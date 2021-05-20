import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { Dashboard } from "../components/Dashboard";

import report from "../report.json";

it("Should render empty Dashboard", () => {
  const props = {};
  const tree = renderer.create(<Dashboard {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Dashboard", () => {
  const props = { report };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Dashboard {...props} />{" "}
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

  it("Should render Dashboard with limited tools", () => {
    const props = { report };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Dashboard {...props} />{" "}
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
