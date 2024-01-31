import * as renderer from "react-test-renderer";

import { Url } from "../components/Url";
import { vi } from "vitest";

const date = new Date(2021, 3, 6);

vi.useFakeTimers();
vi.setSystemTime(date);

const TEST_URL = "https://www.fabrique.social.gouv.fr";

const report = require("../report.json").find((r) => r.url === TEST_URL);

describe("Url", () => {
  it("Should render empty Url", () => {
    const props = { url: "https://some.url" };
    const tree = renderer.create(<Url {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render full Url", () => {
    const props = {
      report: {
        ...report,
        screenshot: false,
      },
      url: TEST_URL,
    };
    const tree = renderer.create(<Url {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render full Url with screenshot", () => {
    const report2 = {
      ...report,
      screenshot: true,
    };
    const props = { report: report2, url: TEST_URL };
    const tree = renderer.create(<Url {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
