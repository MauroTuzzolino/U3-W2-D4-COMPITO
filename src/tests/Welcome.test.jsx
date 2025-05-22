import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Welcome from "../components/Welcome";

describe("Welcome component", () => {
  test("renders correctly and displays welcome message", () => {
    render(<Welcome />);
    const heading = screen.getByText(/Benvenuti in EpiBooks!/i);
    expect(heading).toBeInTheDocument();
  });
});
