// vitestSetup.ts
import { beforeAll, vi } from "vitest";

import FakeDataGrid from "@/components/FakeDataGrid";

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
  vi.mock("@mui/x-data-grid", (props) => ({
    default: FakeDataGrid,
    DataGrid: FakeDataGrid,
  }));
});
