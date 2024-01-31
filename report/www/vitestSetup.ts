// vitestSetup.ts
import { beforeAll, vi } from "vitest";
beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
  vi.mock("@mui/x-data-grid", () => require("./src/components/FakeDataGrid"));
});
