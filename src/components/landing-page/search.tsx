import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Book } from "../../models/search";
import BookCards from "../cards/book-cards";

import BookCardSkeleton from "../skeletons/book-card-skeleton";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const resultsPerPage = 10;

  const fetchBooks = async (searchQuery: string, page: number) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const startIndex = page * resultsPerPage;
      const response = await axios.get<{ items: Book[]; totalItems: number }>(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${resultsPerPage}`
      );
      setBooks(response.data.items || []);
      setTotalItems(response.data.totalItems || 0);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchBooks(query, 0);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(query, nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    if (prevPage >= 0) {
      setPage(prevPage);
      fetchBooks(query, prevPage);
    }
  };

  return (
    <div className="w-[85%] mx-auto pt-[30px] sm:pt-[50px] mb-[30px]">
      <p className="font-semibold mb-4">Search for books</p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full bg-[#F8F8F8] p-1 rounded-full shadow-md"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for a book"
            className="w-full pl-10 pr-4 py-2 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none rounded-full"
          />
        </div>

        <button
          type="submit"
          className="bg-[#1F1F1F] text-white px-6 py-2 rounded-full ml-2 shadow-md hover:bg-black transition"
        >
          Search
        </button>
      </form>

      <div className="mt-6">
        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <div key={book.id} className="h-full">
                <BookCards book={book} />
              </div>
            ))}
          </div>
        )}

        {books.length > 0 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className={`px-4 py-2 rounded-md ${
                page === 0 ? "bg-gray-300" : "bg-[#1F1F1F] text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={loading || totalItems <= (page + 1) * resultsPerPage}
              className={`px-4 py-2 rounded-md ${
                loading || totalItems <= (page + 1) * resultsPerPage
                  ? "bg-gray-300"
                  : "bg-[#1F1F1F] text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
