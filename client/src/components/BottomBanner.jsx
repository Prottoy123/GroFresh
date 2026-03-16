import React from "react";
import { assets, features } from "../assets/assets";

function BottomBanner() {
  return (
    <div className="relative mt-24">
      {/* Background Images */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center py-10 md:py-0 md:pr-24">
        {/* Container for Heading and Features */}
        <div className="bg-white/90 md:bg-transparent p-6 md:p-0 rounded-2xl backdrop-blur-sm md:backdrop-blur-0 max-w-lg w-[90%] md:w-full border border-white/20 md:border-none shadow-xl md:shadow-none">
          <h1 className="text-2xl md:text-4xl font-bold text-emerald-800 mb-5 text-center md:text-left">
            Why{" "}
            <span className="border-b-4 border-emerald-400 pb-1">
              we are the best?
            </span>
          </h1>

          {/* Features List */}
          <div className="flex flex-col gap-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 border border-emerald-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon and Title Row */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-emerald-500 p-2 rounded-lg flex-shrink-0 shadow-inner">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-6 h-6 md:w-7 md:h-7 brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-slate-800 uppercase tracking-wide">
                    {feature.title}
                  </h3>
                </div>

                {/* Description - Constrained within the box */}
                <p className="text-gray-600 text-xs md:text-sm leading-snug pl-12">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
