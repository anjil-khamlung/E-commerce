import React from 'react'

const CategorySectionSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-20">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white  shadow-md p-4">
          {/* Category Title */}
          <div className="h-6 w-32 bg-gray-200  animate-pulse mb-4"></div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full h-28 bg-gray-200  animate-pulse"></div>
                <div className="mt-2 h-3 w-3/4 bg-gray-200  animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Bottom Link */}
          <div className="mt-4 h-4 w-24 bg-gray-200  animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default CategorySectionSkeleton