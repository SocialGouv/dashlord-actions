import React from "react";
import path from "path";
import * as renderer from "react-test-renderer";

jest.mock("../components/Gauge", () => ({
  Gauge: () => <div>gauge mock</div>,
}));
jest.useFakeTimers("modern");
jest.setSystemTime(new Date("2021-04-06").getTime());

const TEST_URL = "https://www.fabrique.social.gouv.fr";

const report = require("../report.json").find((r) => r.url === TEST_URL);

beforeAll(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = "/prefix";
});
afterAll(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = "";
});

it("Should render Url with NEXT_PUBLIC_BASE_PATH", async () => {
  const report2 = {
    ...report,
    screenshot: true,
  };
  const props = { report: report2, url: TEST_URL };
  const { Url } = await import("../components/Url");
  const tree = renderer.create(<Url {...props} />);
  const img = tree.root.findByType("img");
  expect(img.props.src).toEqual(
    "/prefix/report/aHR0cHM6Ly93d3cuZmFicmlxdWUuc29jaWFsLmdvdXYuZnI=/screenshot.jpeg"
  );
});
