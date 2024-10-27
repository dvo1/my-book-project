import React from "react";
import { Book } from "../../models/search";
import { Link } from "react-router-dom";


interface BookCardsProps {
  book: Book; 
}

const BookCards: React.FC<BookCardsProps> = ({ book }) => {
  //  console.log(book)
  return (
    <Link to={`/book/${book.id}`} className="h-full"> 
    <div className="bg-white p-4 rounded-lg shadow flex flex-col h-full">
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x192.png?text=No+Image"
        }
        alt={book.volumeInfo.title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {book.volumeInfo.title}
      </h3>
      <p className="text-sm text-gray-600 mt-auto">
        {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
      </p>
      <p className="text-[12px] text-gray-600 mt-auto">
        {book.volumeInfo.publishedDate}
      </p>
    </div>
    </Link>
  );
};

export default BookCards;
