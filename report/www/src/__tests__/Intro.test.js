import path from "path";
import * as React from "react";
import { render } from "@testing-library/react";
import Intro from "@/pages/intro";

const mockSampleConfig = JSON.parse(
  jest
    .requireActual("fs")
    .readFileSync(path.join(__dirname, "config.json"))
    .toString()
);

it("Should render Intro", () => {
  const { container } = render(<Intro />);
  expect(container).toMatchSnapshot();
});

describe("Tools config", () => {
  beforeEach(() => {
    jest.mock("../config.json", () => {
      return {
        ...mockSampleConfig,
        tools: {
          ...mockSampleConfig.tools,
          http: false,
          zap: true,
          lighthouse: false,
        },
      };
    });
  });
  it("Should render Intro with limited tools", () => {
    const { container } = render(<Intro />);
    expect(container).toMatchSnapshot();
  });
});
