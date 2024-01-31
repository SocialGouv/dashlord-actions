import * as React from "react";
import * as renderer from "react-test-renderer";

import { vi } from "vitest";

import { Dashboard } from "@/components/Dashboard";

import report from "@/report.json";

describe("Tools config", () => {
  beforeAll(() => {
    vi.mock("@/config.json", async () => {
      const config = {
        ...(await vi.importActual("@/config.json")),
        tools: { http: false, zap: true, lighthouse: false },
      };
      return {
        default: config,
      };
    });
  });

  it("Should render Dashboard with limited tools", () => {
    const props = { report };
    const tree = renderer.create(<Dashboard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
