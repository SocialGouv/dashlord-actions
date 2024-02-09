import { render } from "@testing-library/react";
import { HeaderSite } from "@/components/HeaderSite";

it("Should render HeaderSite", () => {
  const { container } = render(<HeaderSite />);
  expect(container).toMatchSnapshot();
});
