import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../../models/search"; // Import Book type
import BookDetailSkeleton from "../skeletons/book-detail-skeleton";
import { getBookDetail } from "../../API/search";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("Book ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await getBookDetail({ id });
        setBook(response);
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

  if (loading) return <BookDetailSkeleton />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!book) return <p className="text-center mt-10">No book found.</p>;

  return (
    <div className="w-[85%] sm:w-[90%] mx-auto pt-[30px] sm:pt-[50px] mb-[30px]">
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
        <div className="md:w-2/3 w-full max-w-2xl p-8 bg-white rounded-lg shadow-md space-y-4 overflow-hidden">
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

          <p>
            <strong className="text-lg text-gray-800">Published Date:</strong>{" "}
            {book.volumeInfo.publishedDate || "Unknown Date"}
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
