import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full mt-20 px-4 md:px-10 lg:px-20 pb-6">
      {/* Premium Minimalist Gradient Card */}
      <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl shadow-2xl shadow-green-200/50 overflow-hidden relative">
        {/* Decorative Background Glow (Organic Feel) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center text-center gap-6">
          {/* Brand Logo - Centered & Elevated */}
          <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:scale-105 transition-transform duration-300">
            <img
              className="w-28 md:w-32 object-contain"
              src={assets.logo}
              alt="Grocery-Cart Logo"
            />
          </div>

          {/* High-Impact Brand Statement */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3 drop-shadow-sm">
              Freshness Delivered to Your Doorstep
            </h2>
            <p className="text-emerald-50 font-medium text-sm md:text-base leading-relaxed opacity-90 max-w-xl mx-auto">
              Skip the queues and let us bring the best quality groceries right
              to you. Simple, fast, and 100% reliable shopping experience.
            </p>
          </div>
        </div>

        {/* Minimal Copyright & Developer Credit Bar */}
        <div className="relative bg-black/15 backdrop-blur-md py-5 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-white/90 font-bold uppercase tracking-widest border-t border-white/20">
          <p>{new Date().getFullYear()} © GroceryCart. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Developed with</span>
            <span className="text-rose-400 text-sm">♥</span>
            <span>by</span>
            <span className="text-white font-black drop-shadow-md tracking-wider">
              Monjurul Islam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
