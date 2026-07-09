const ProductCard = () => (
  <div className="bg-white shadow-md p-4 animate-pulse">
    <div className="h-48 bg-gray-200 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/5"></div>
  </div>
);

const ProductCardSkeleton = ({ count = 8, showTitle = true }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      {showTitle && (
        <h2 className="flex items-center justify-center animate-pulse bg-gray-200 h-6 w-48 rounded mb-4 mx-auto"></h2>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
