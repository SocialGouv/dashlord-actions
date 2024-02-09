import * as renderer from "react-test-renderer";

import { Url } from "@/components/Url";
import { vi } from "vitest";

const date = new Date(2021, 3, 6);

vi.useFakeTimers();
vi.setSystemTime(date);

const TEST_URL = "https://www.fabrique.social.gouv.fr";

const report = require("../report.json").find((r) => r.url === TEST_URL);

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

  it("Should render Url with limited tools", () => {
    const props = { report, url: TEST_URL };
    const tree = renderer.create(<Url {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
