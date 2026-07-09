const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-6 py-10 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image Skeleton */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-96 bg-gray-300 rounded"></div>
        </div>

        {/* Product Info Skeleton */}
        <div>
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

          {/* Brand */}
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-5 w-28 bg-gray-300 rounded"></div>
            <div className="h-5 w-10 bg-gray-300 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>

          {/* Description */}
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>

          {/* Buttons */}
          <div className="h-12 bg-gray-300 rounded w-35 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-24 mx-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
