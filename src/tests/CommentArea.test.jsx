import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentArea from "../components/CommentArea";

// Test quando NON c'è un asin selezionato
describe("CommentArea component (no asin)", () => {
  test("renders message prompting user to select a book", () => {
    render(<CommentArea />);
    expect(screen.getByText(/seleziona un libro/i)).toBeInTheDocument();
  });
});

// Test quando c'è un asin selezionato
describe("CommentArea component (with asin)", () => {
  test("renders input fields for adding comments and area for comment list", async () => {
    render(<CommentArea asin="0316438960" />);

    // Verifica che venga renderizzato un campo di testo (es. input o textarea)
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs.length).toBeGreaterThan(0);

    // Verifica che venga mostrata un'area per i commenti (fallback: cerca una lista o container)
    const commentListContainer = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "div" && content.toLowerCase().includes("comment");
    });
    expect(commentListContainer).toBeInTheDocument();
  });
});
