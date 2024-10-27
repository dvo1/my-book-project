
import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../components/landing-page/hero";
import "@testing-library/jest-dom";


describe("Hero Component", () => {
  test("renders welcome message", () => {
    render(<Hero />);
    const welcomeMessage = screen.getByText(/Welcome to/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("renders the book request message", () => {
    render(<Hero />);
    const requestMessage = screen.getByText(/Discover a world of books/i);
    expect(requestMessage).toBeInTheDocument();
  });

  test("renders the Browse Books button", () => {
    render(<Hero />);
    const buttonElement = screen.getByRole("button", { name: /Browse Books/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders the book image", () => {
    render(<Hero />);
    const imgElement = screen.getByAltText(/Book/i);
    expect(imgElement).toBeInTheDocument();
  });
});
