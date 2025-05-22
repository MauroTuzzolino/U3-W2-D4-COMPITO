import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookList from "../components/BookList";

// Mock della fetch globale
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          _id: "rev123",
          comment: "Ottimo libro!",
          rate: 5,
        },
        {
          _id: "rev124",
          comment: "Interessante ma un po’ lento.",
          rate: 3,
        },
      ]),
  })
);

const mockBooks = [
  {
    asin: "AAA111",
    title: "Libro con recensioni",
    img: "https://example.com/book.jpg",
    price: 9.99,
  },
];

describe("BookList with comments", () => {
  test("loads and displays comments after selecting a book", async () => {
    render(<BookList books={mockBooks} />);

    // Clic sul libro per attivare il fetch
    const bookImg = screen.getByRole("img");
    fireEvent.click(bookImg);

    // Aspettiamo che i commenti appaiano
    await waitFor(() => {
      expect(screen.getByText(/ottimo libro/i)).toBeInTheDocument();
      expect(screen.getByText(/interessante/i)).toBeInTheDocument();
    });

    // Verifica che ci siano almeno due pulsanti "Elimina"
    const deleteButtons = screen.getAllByRole("button", { name: /elimina/i });
    expect(deleteButtons.length).toBe(2);
  });
});
