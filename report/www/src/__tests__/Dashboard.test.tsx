import path from "path";
import * as React from "react";
import * as renderer from "react-test-renderer";

import fs from "fs";
import { vi } from "vitest";

import { Dashboard } from "../components/Dashboard";

import report from "../report.json";

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
