import React from 'react'

const BookCardSkeleton = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-lg shadow h-[300px]">
      <div className="h-40 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

export default BookCardSkeleton