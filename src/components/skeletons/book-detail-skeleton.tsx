import React from "react";

const BookDetailSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center min-h-screen bg-gray-50 p-8">
      <div className="md:w-1/3 w-full max-w-sm">
        <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      <div
        className="md:w-2/3 w-full max-w-2xl p-8 bg-white rounded-lg shadow-sm space-y-4"
        style={{ maxHeight: "450px" }}
      >
        <div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>

        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </div>

        <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>

        <div className="w-32 h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default BookDetailSkeleton;
