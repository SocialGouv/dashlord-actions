import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";

const report = require("../report.json");

it("Should render empty Sidebar", () => {
  const props = {};
  const tree = renderer
    .create(
      <MemoryRouter>
        <Sidebar {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Sidebar", () => {
  const props = { report };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Sidebar {...props} />
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

  it("Should render Sidebar with limited tools", () => {
    const props = { report };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Sidebar {...props} />{" "}
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
