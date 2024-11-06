
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import BookDetails from "../components/pages/book-detail";


jest.mock("axios"); 
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BookDetails Component", () => {
  const bookData = {
    volumeInfo: {
      title: "Harry Potter",
      authors: ["J.K. Rowling"],
      description: "A book about a wizard.",
      imageLinks: { thumbnail: "https://example.com/image.jpg" },
    },
  };

  const renderComponent = (bookId: string) =>
    render(
      <MemoryRouter initialEntries={[`/book/${bookId}`]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("displays the loading skeleton while fetching data", () => {
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {})); 

    renderComponent("1"); 

    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); 
  });

  test("displays book details on successful fetch", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: bookData });

    renderComponent("1"); 

    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); 

    expect(await screen.findByText("Harry Potter")).toBeInTheDocument();
    expect(await screen.findByText("J.K. Rowling")).toBeInTheDocument();
    expect(await screen.findByAltText("Harry Potter")).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    renderComponent("1"); 

    await waitFor(() => {
      expect(
        screen.getByText("Could not fetch book details. Please try again.")
      ).toBeInTheDocument();
    });
  });

  test("displays 'No book found' if book data is null", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });

    renderComponent("invalid-id"); 

    await waitFor(() => {
      expect(screen.getByText("No book found.")).toBeInTheDocument();
    });
  });

  test("navigates back to the search page when 'Back to Search' is clicked", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: bookData });

    renderComponent("1"); 

    await waitFor(() => {
      expect(screen.getByText("Harry Potter")).toBeInTheDocument(); 
    });

    const backButton = screen.getByText("Back to Search");
    fireEvent.click(backButton); 

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
