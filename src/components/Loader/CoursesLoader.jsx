import React from 'react'

export const CoursesLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
  )
}
