import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookList from "../components/BookList";

// Dati mock con almeno un libro
const mockBooks = [
  {
    asin: "AAA111",
    title: "First Book",
    img: "https://example.com/first.jpg",
    price: 9.99,
  },
];

describe("BookList initial state", () => {
  test("no SingleComment components are rendered initially", () => {
    render(<BookList books={mockBooks} />);

    // Non ci devono essere commenti finché non è selezionato un libro
    const commentElements = screen.queryAllByText((content, element) => {
      return element?.tagName.toLowerCase() === "li" && content.toLowerCase().includes("elimina");
    });

    expect(commentElements.length).toBe(0);
  });
});
