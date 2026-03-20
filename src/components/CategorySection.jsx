import React from 'react'
import CategoryCard from './CategoryCard';
import SmallGrid from './SmallGrid';

const CategorySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-20">
      <CategoryCard title="Shop for your home essentials">
        <SmallGrid category="laptops" />
      </CategoryCard>

      <CategoryCard title="Shop for your home essentials">
        <SmallGrid category="groceries" />
      </CategoryCard>

      <CategoryCard title="Shop for your home essentials">
        <SmallGrid category="mens-watches" />
      </CategoryCard>

      <CategoryCard title="Shop for your home essentials">
        <SmallGrid category="womens-bags" />
      </CategoryCard>
    </div>
  );
};
export default CategorySection