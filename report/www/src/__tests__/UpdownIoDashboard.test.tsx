import { render } from "@testing-library/react";
import UpdownIo from "../../pages/updownio";
import { vi } from "vitest";

const date = new Date(2021, 3, 6);

vi.useFakeTimers();
vi.setSystemTime(date);

it("Should render UpdownIo", () => {
  const { container } = render(<UpdownIo />);
  expect(container).toMatchSnapshot();
});
