import { render } from "@testing-library/react";
import { FooterSite } from "@/components/FooterSite";

it("Should render FooterSite", () => {
  const { container } = render(<FooterSite />);
  expect(container).toMatchSnapshot();
});
