import * as React from "react";
import { render } from "@testing-library/react";
import UpdownIo from "@/pages/updownio";

jest.mock("../components/Gauge", () => ({
  Gauge: () => <div>gauge mock</div>,
}));
it("Should render UpdownIo", () => {
  const { container } = render(<UpdownIo />);
  expect(container).toMatchSnapshot();
});
