import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems,navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          scrollTo(0, 0);
        }}
        className="flex flex-col w-full min-w-[220px] max-w-[250px] bg-[#F4F6F3] border border-[#DCE4D8] rounded-[20px] overflow-hidden shadow-sm"
      >
        {/* Image Box - Hover is restricted strictly to this section */}
        <div className="group/img relative h-40 w-full bg-white flex items-center justify-center p-4 border-b border-[#DCE4D8] cursor-pointer overflow-hidden">
          <img
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover/img:scale-110"
            src={product.image[0]}
            alt={product.name}
          />

          {/* Discount Badge */}
          {product.offerPrice < product.price && (
            <div className="absolute top-2 left-2 bg-[#E75B4E] text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider">
              -
              {Math.round(
                ((product.price - product.offerPrice) / product.price) * 100,
              )}
              %
            </div>
          )}
        </div>

        {/* Details Section - Dead Static (No Hover Effects) */}
        <div className="px-3 py-3 flex-1 flex flex-col bg-[#F4F6F3]">
          <span className="text-[9px] font-bold text-[#6D8A74] uppercase tracking-widest mb-1">
            {product.category}
          </span>
          {/* Font size reduced to 14px for cleaner look */}
          <h3 className="text-[#1D2B22] font-extrabold text-[14px] leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating & Stock - Scaled down */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <img src={assets.star_icon} className="w-3" alt="rating" />
              <span className="text-[11px] font-bold text-orange-500 ml-1">
                4.5
              </span>
            </div>
            <span className="text-[#6D8A74] text-[9px] font-extrabold bg-[#E1EADF] px-1.5 py-0.5 rounded">
              IN STOCK
            </span>
          </div>

          {/* Action Area */}
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[#6D8A74] text-[10px] line-through font-semibold mb-0.5">
                {currency} ${product.price}
              </span>
              <span className="text-[#1C462A] text-xl font-black leading-none">
                {currency} ${product.offerPrice}
              </span>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1.5 bg-[#1C462A] text-white px-3 h-[32px] rounded-[8px] cursor-pointer"
                  onClick={() => addToCart(product._id)}
                >
                  <img
                    src={assets.cart_icon}
                    className="w-3.5"
                    style={{ filter: "brightness(0) invert(1)" }}
                    alt="Add"
                  />
                  <span className="font-bold text-xs text-white">Add</span>
                </button>
              ) : (
                <div className="flex items-center justify-between bg-white rounded-[8px] border border-[#1C462A] h-[32px] w-[76px]">
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                    className="w-7 h-full flex items-center justify-center text-[#1C462A] font-bold text-base cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-1 text-xs font-black text-[#1D2B22]">
                    {cartItems[product._id] || 0}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product._id);
                    }}
                    className="w-7 h-full flex items-center justify-center text-[#1C462A] font-bold text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
