import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16 mb-16">
      <div className="flex flex-col items-start w-max mb-8">
        <p className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
          Best Sellers
        </p>
        <div className="w-16 h-1.5 bg-green-500 rounded-full mt-2"></div>
      </div>

      {/* ম্যাজিক ফিক্স: Fluid Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mt-4">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
