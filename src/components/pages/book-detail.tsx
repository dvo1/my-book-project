// src/components/book-details/BookDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { Book } from "../../models/search";
import BookDetailSkeleton from "../skeletons/book-detail-skeleton";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Could not fetch book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <BookDetailSkeleton />
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!book) return <p className="text-center mt-10">No book found.</p>;

  return (
    <div  className="w-[85%] sm:w-[90%] mx-auto pt-[30px] sm:pt-[50px] mb-[30px]">
 <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
      <div className="md:w-1/3 w-full max-w-sm">
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/300x450.png?text=No+Image"
          }
          alt={book.volumeInfo.title}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
      <div
        className="md:w-2/3 w-full max-w-2xl p-8 bg-white rounded-lg shadow-sm space-y-4 overflow-hidden"
        style={{ maxHeight: "450px" }}
      >
        <h1 className="text-2xl font-bold text-gray-900 truncate">
          {book.volumeInfo.title}
        </h1>

        <p className="text-lg text-gray-700 line-clamp-5">
          {book.volumeInfo.description || "No description available."}
        </p>

        <p>
          <strong className="text-lg text-gray-800">Authors:</strong>{" "}
          {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
        </p>

        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md"
        >
          Back to Search
        </button>
      </div>
      </div>
    </div>
  );
};

export default BookDetails;
