import * as renderer from "react-test-renderer";
import { vi } from "vitest";

const date = new Date(2021, 3, 6);

vi.useFakeTimers();
vi.setSystemTime(date);

const TEST_URL = "https://www.fabrique.social.gouv.fr";

const report = require("../report.json").find((r) => r.url === TEST_URL);

beforeAll(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = "/prefix";
});
afterAll(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = "";
});

it("Should render Url with NEXT_PUBLIC_BASE_PATH", async () => {
  const props = { report, url: TEST_URL };
  const { Url } = await import("../components/Url");
  const tree = renderer.create(<Url {...props} />);
  const img = tree.root.findByType("img");
  expect(img.props.src).toEqual(
    "/prefix/report/aHR0cHM6Ly93d3cuZmFicmlxdWUuc29jaWFsLmdvdXYuZnI=/screenshot.jpeg"
  );
});
