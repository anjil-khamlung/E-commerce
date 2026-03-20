import React from 'react'

const CategoryCard = ({ title, image, children }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>

      {image ? (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      ) : (
        children
      )}
    </div>
  );
};

export default CategoryCard