import { render } from "@testing-library/react";
import { FooterSite } from "@/components/FooterSite";
import { vi } from "vitest";

it("Should render FooterSite", () => {
  const { container } = render(<FooterSite />);
  expect(container).toMatchSnapshot();
});
