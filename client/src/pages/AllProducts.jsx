import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const { products, searchQuery, setsearchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-20 flex flex-col px-4 max-w-[1400px] mx-auto">
      {/* Unique & Clean Header Design */}
      <div className="flex flex-col mb-10 group cursor-default">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-primary rounded-full"></div>
          <p className="text-3xl font-bold tracking-tight text-gray-800 uppercase">
            All Products
          </p>
        </div>
        <div className="w-24 h-1 bg-gray-100 mt-1 overflow-hidden rounded-full">
          <div className="w-10 h-full bg-primary rounded-full group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Modern Optimized Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-5">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <div
              key={index}
              className="hover:scale-[1.02] transition-transform duration-300 ease-out"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllProducts;
