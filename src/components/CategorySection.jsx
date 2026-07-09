import React, { useContext } from "react";
import SmallGrid from "./SmallGrid";
import { GlobalContext } from "../context/GlobalContext";
import CategorySectionSkeleton from "./skeletons/CategorySectionSkeleton";

const CategorySection = () => {
  const { categories, loading, error } = useContext(GlobalContext);

  if (loading) return <CategorySectionSkeleton />;

  if (error) {
    return (
      <div className="col-span-full text-center">
        <div className="inline-block bg-white px-4 py-2 rounded text-3xl text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-20">
      {categories.map((cat) => (
        <div key={cat} className="bg-gray-50 shadow-md">
          <SmallGrid category={cat} />
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
