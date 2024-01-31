import path from "path";
import * as React from "react";
import { render } from "@testing-library/react";
import Intro from "../../pages/intro";

it("Should render Intro", () => {
  const { container } = render(<Intro />);
  expect(container).toMatchSnapshot();
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
  it("Should render Intro with limited tools", () => {
    const { container } = render(<Intro />);
    expect(container).toMatchSnapshot();
  });
});
