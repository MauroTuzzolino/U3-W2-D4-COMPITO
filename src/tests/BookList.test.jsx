import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookList from "../components/BookList";

// Dati mock per due libri
const mockBooks = [
  {
    asin: "AAA111",
    title: "First Book",
    img: "https://example.com/first.jpg",
    price: 9.99,
  },
  {
    asin: "BBB222",
    title: "Second Book",
    img: "https://example.com/second.jpg",
    price: 12.99,
  },
];

describe("BookList selection behavior", () => {
  test("selecting a second book deselects the first", () => {
    render(<BookList books={mockBooks} />);

    const images = screen.getAllByRole("img");
    const firstBookDiv = images[0].closest("div");
    const secondBookDiv = images[1].closest("div");

    // Clic sul primo libro
    fireEvent.click(firstBookDiv);
    expect(firstBookDiv).toHaveStyle("border: 2px solid red");
    expect(secondBookDiv).toHaveStyle("border: none");

    // Clic sul secondo libro
    fireEvent.click(secondBookDiv);
    expect(firstBookDiv).toHaveStyle("border: none");
    expect(secondBookDiv).toHaveStyle("border: 2px solid red");
  });
});
