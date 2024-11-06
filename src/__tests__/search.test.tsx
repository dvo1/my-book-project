import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import axios from "axios";
import "@testing-library/jest-dom";
import Search from "../components/landing-page/search";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("updates input value on change", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/Search for a book/i);
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(input).toHaveValue("Harry Potter");
  });

  test("fetches books on form submission", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        items: [{ id: "1", volumeInfo: { title: "Harry Potter", authors: ["J.K. Rowling"], imageLinks: { thumbnail: "https://example.com/image.jpg" } } }],
        totalItems: 1,
      },
    });

    render(<Search />);
    const input = screen.getByPlaceholderText(/Search for a book/i);
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("Harry Potter"));
      
    });
    expect(screen.getByText(/Harry Potter/i)).toBeInTheDocument();
  });

  test("displays loading skeleton while fetching data", async () => {

    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {})); 

    render(<Search />);
    const input = screen.getByPlaceholderText(/Search for a book/i);
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    fireEvent.submit(screen.getByRole("form"));

    
    const skeletons = await screen.findAllByRole("img", { hidden: true });
    expect(skeletons.length).toBe(10); 
  });

  test("displays error message on fetch failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(<Search />);
    const input = screen.getByPlaceholderText(/Search for a book/i);
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong. Please try again/i)).toBeInTheDocument();
    });
  });

  test("displays book cards when data is fetched", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        items: [
          {
            id: "1",
            volumeInfo: {
              title: "Harry Potter",
              authors: ["J.K. Rowling"],
              imageLinks: { thumbnail: "https://example.com/image.jpg" },
            },
          },
        ],
        totalItems: 1,
      },
    });

    render(<Search />);
    const input = screen.getByPlaceholderText(/Search for a book/i);
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/Harry Potter/i)).toBeInTheDocument();
     
    });
    expect(screen.getByAltText(/Harry Potter/i)).toBeInTheDocument(); 
  });
});
