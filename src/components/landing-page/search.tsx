import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import BookCards from "../cards/book-cards";
import BookCardSkeleton from "../skeletons/book-card-skeleton";
import { Book } from "../../models/search";
import { WithPagination } from "hoc/WithPagination";

interface SearchProps {
  data: Book[];
  loading: boolean;
  error: string | null;
  page: number;
  totalItems: number;
  nextPage: () => void;
  prevPage: () => void;
  fetchData: (query: string, page: number) => void;
}

const Search: React.FC<SearchProps> = ({
  data: books,
  loading,
  error,
  page,
  totalItems,
  nextPage,
  prevPage,
  fetchData,
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("query") || "";
    setQuery(initialQuery);
    if (initialQuery) {
      fetchData(initialQuery, 0);
    }
  }, [fetchData]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Update the URL with the new query
    const url = new URL(window.location.href);
    url.searchParams.set("query", query);
    window.history.pushState({}, "", url.toString());

    fetchData(query, 0);
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
              onClick={prevPage}
              disabled={page === 0}
              className={`px-4 py-2 rounded-md ${
                page === 0 ? "bg-gray-300" : "bg-[#1F1F1F] text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={loading || totalItems <= (page + 1) * 10}
              className={`px-4 py-2 rounded-md ${
                loading || totalItems <= (page + 1) * 10
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

export default WithPagination(Search);