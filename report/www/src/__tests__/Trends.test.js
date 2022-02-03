import * as React from "react";
import { render } from "@testing-library/react";
import Trends from "@/pages/trends";

it("Should render Trends", () => {
  const { container } = render(<Trends />);
  expect(container).toMatchSnapshot();
});
