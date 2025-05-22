import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AllTheBooks from "../components/AllTheBooks";
import fantasy from "../data/fantasy.json";

describe("AllTheBooks component", () => {
  test("renders one Card per book in the fantasy dataset", () => {
    render(<AllTheBooks />);

    // Ogni Card contiene un'immagine del libro, possiamo contare le immagini
    const cardImages = screen.getAllByRole("img");

    expect(cardImages.length).toBe(fantasy.length);
  });
});
