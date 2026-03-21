import React from 'react'
import CategoryCard from './CategoryCard';
import SmallGrid from './SmallGrid';

const CategorySection = () => {
  const category = [
    "smartphones",
    "laptops",
    "fragrances",
    "beauty",
    "skin-care",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "sports-accessories",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "kitchen-accessories",
    "motorcycle",
    "mobile-accessories",
    
   
  ];
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  -mt-20">
      {category.map((cat) => (
        <CategoryCard key={cat} >
          <SmallGrid category={cat}/>
        </CategoryCard>
   ))}
    </div>
  );
};
export default CategorySection