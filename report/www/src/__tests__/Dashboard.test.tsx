/// <reference types="vitest" />

import path from "path";
import * as React from "react";
import * as renderer from "react-test-renderer";

// jest.mock("next/router", () => jest.requireActual("next-router-mock"));

// jest.mock("@mui/x-data-grid/components/GridColumnHeaders", () => {
//   return <div>pouet</div>;
// });

//import { GridColumnHeaders } from "@mui/x-data-grid";

// const spyGridColumnHeaders = jest.spyOn(
//   require("@mui/x-data-grid"),
//   "GridColumnHeaders"
// );
// spyGridColumnHeaders.mockImplementation(() => <div>pouet</div>);

// jest.mock("@mui/x-data-grid", () => () => {
//   return <div>header</div>;
// });

import { Dashboard } from "../components/Dashboard";

import report from "../report.json";

import fs from "fs";
import { vi } from "vitest";

vi.mock("@/config.json", async (importOriginal) => {
  const config = fs
    .readFileSync(path.join(__dirname, "config.json"))
    .toString();
  console.log("config", config);
  return config;
});

vi.mock("@mui/x-data-grid", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    DataGrid: () => <div>empty dashboard</div>, // .fn(() => null),
  };
  //return config;
});

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
    vi.mock("../../config.json", async (importOriginal) => {
      const config = fs
        .readFileSync(path.join(__dirname, "config.json"))
        .toString();
      return {
        ...config,
        tools: { http: false, zap: true, lighthouse: false },
      };
    });
  });

  it("Should render Dashboard with limited tools", () => {
    const props = { report };
    const tree = renderer.create(<Dashboard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
