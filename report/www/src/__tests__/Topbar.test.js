import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { Topbar } from "../components/Topbar";

const report = require("../report.json");

it("Should render empty Topbar", () => {
  const props = {};
  const tree = renderer
    .create(
      <MemoryRouter>
        <Topbar {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should render full Topbar", () => {
  const props = { report };
  const tree = renderer
    .create(
      <MemoryRouter>
        <Topbar {...props} />
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

  it("Should render Topbar with limited tools", () => {
    const props = { report };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Topbar {...props} />{" "}
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
