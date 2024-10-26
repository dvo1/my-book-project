import React from "react";

const Hero = () => {
  return (
    <div className="w-[85%] sm:w-[90%] mx-auto pt-[30px] sm:pt-[50px] mb-[30px]">
      <p className="text-[#00000080] mb-[10px]">
        Welcome to{" "}
        <span style={{ fontSize: "20px", color: "black", fontWeight: "500" }}>
          DURO BOOKS
        </span>
      </p>
      <div className="flex flex-row sm:flex-col sm:justify-start justify-between items-center bg-[#1F1F1F] p-[20px] sm:p-[15px] rounded-[10px]">
        <div className="">
          <p className="text-[#fff] text-[50px] sm:text-[30px] sm:text-center mb-[5px]">
            Need a{" "}
            <span className="text-[60px] sm:text-[40px] font-medium">Book?</span>
          </p>
          <p className="max-w-[500px] text-[#fff] text-[16px] sm:text-center">
            Discover a world of books, carefully curated to meet your reading
            needs. If the title you want isn’t available, simply make a request,
            and we’ll do our best to get it to you quickly!
          </p>
          <div className="mt-[15px] sm:text-center">
            <button className="bg-white text-[#1F1F1F] font-bold py-2 px-6 rounded-[10px] shadow-md transition duration-300 ease-in-out hover:bg-[#f0f0f0]">
              Browse Books
            </button>
          </div>
        </div>
        <div>
          <img
            src="/assets/book.png"
            alt="Book"
            className="w-full sm:h-auto transform sm:rotate-[20deg]"
            style={{ height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
