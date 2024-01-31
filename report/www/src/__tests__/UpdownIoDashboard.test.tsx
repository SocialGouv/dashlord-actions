import { render } from "@testing-library/react";
import UpdownIo from "../../pages/updownio";

it("Should render UpdownIo", () => {
  const { container } = render(<UpdownIo />);
  expect(container).toMatchSnapshot();
});
