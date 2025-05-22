import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SingleBook from "../components/SingleBook";

const mockBook = {
  asin: "12345",
  title: "Test Book",
  img: "https://example.com/test.jpg",
  price: 10.99,
};

describe("SingleBook component", () => {
  test("renders with no red border by default", () => {
    render(<SingleBook book={mockBook} isSelected={false} onBookSelect={() => {}} />);

    const container = screen.getByRole("img").closest("div");
    expect(container).toHaveStyle("border: none");
  });

  test("calls onBookSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<SingleBook book={mockBook} isSelected={false} onBookSelect={onSelect} />);

    const container = screen.getByRole("img").closest("div");
    fireEvent.click(container);

    expect(onSelect).toHaveBeenCalledWith("12345");
  });

  test("renders with red border when selected", () => {
    render(<SingleBook book={mockBook} isSelected={true} onBookSelect={() => {}} />);

    const container = screen.getByRole("img").closest("div");
    expect(container).toHaveStyle("border: 2px solid red");
  });
});
