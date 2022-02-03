import path from "path";
import * as React from "react";
import { render } from "@testing-library/react";
import Trends from "@/pages/Trends";

const mockSampleConfig = JSON.parse(
  jest
    .requireActual("fs")
    .readFileSync(path.join(__dirname, "config.json"))
    .toString()
);

it("Should render Trends", () => {
  const { container } = render(<Trends />);
  expect(container).toMatchSnapshot();
});
