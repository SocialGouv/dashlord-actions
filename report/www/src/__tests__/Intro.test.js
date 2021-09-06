import path from "path";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { Intro } from "../components/Intro";

import report from "../report.json";

const mockSampleConfig = JSON.parse(
  jest
    .requireActual("fs")
    .readFileSync(path.join(__dirname, "config.json"))
    .toString()
);

// // prevent empty table due to resize detection
// jest.mock(
//   "react-virtualized-auto-sizer",
//   () =>
//     ({ children }) =>
//       children({ width: 1000, height: 1000 })
// );

it("Should render Intro", () => {
  const props = {report};
  const tree = renderer.create(<MemoryRouter><Intro {...props} /></MemoryRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});

 
describe("Tools config", () => {
  beforeEach(() => {
    jest.mock("../config.json", () => ({
      ...mockSampleConfig,
      tools: { http: false, zap: true, lighthouse: false },
    }));
  });

  it("Should render Intro with limited tools", () => {
    const props = { report };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Intro {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
