import fs from "fs";
import path from "path";
import * as React from "react";
import { render } from "@testing-library/react";
import Intro from "../../pages/intro";
import { vi } from "vitest";

it("Should render Intro", () => {
  const { container } = render(<Intro />);
  expect(container).toMatchSnapshot();
});

describe("Tools config", () => {
  beforeEach(() => {
    vi.mock("@/config.json", async (importOriginal) => {
      const config = await importOriginal();
      return {
        default: {
          ...config,
          tools: { http: false, zap: true, lighthouse: false },
        },
      };
    });
  });
  it("Should render Intro with limited tools", () => {
    const { container } = render(<Intro />);
    expect(container).toMatchSnapshot();
  });
});
