import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function MainBanner() {
  return (
    <div className="relative mt-2 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* ডেস্কটপ এবং মোবাইল ব্যাকগ্রাউন্ড ইমেজ */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block rounded-xl object-cover shadow-sm"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden rounded-xl object-cover shadow-sm"
      />

      {/* টেক্সট এবং বাটন কন্টেইনার */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center pb-24 md:pb-0 px-8 md:pl-16 lg:pl-24">
        {/* টেক্সট উইডথ অপটিমাইজেশন */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[280px] md:max-w-md lg:max-w-lg leading-tight text-gray-900 drop-shadow-sm">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        {/* বাটন গ্রুপ */}
        <div className="flex flex-wrap items-center justify-center md:justify-start mt-8 font-semibold gap-4 md:gap-6">
          {/* Primary CTA Button: লোগোর সাথে ম্যাচ করে পার্পল-ব্লু শেড এবং রাউন্ডেড শেপ */}
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-8 py-3.5 bg-[#5C67F2] hover:bg-[#4A54D1] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl text-white cursor-pointer"
          >
            Shop now
            <img
              className="transition-transform duration-300 group-hover:translate-x-1.5"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          {/* Secondary CTA Button: ক্লিয়ার ভিজিবিলিটির জন্য সলিড হোয়াইট ব্যাকগ্রাউন্ড */}
          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-8 py-3.5 bg-white text-[#5C67F2] hover:bg-gray-50 transition-all duration-300 rounded-full shadow-md hover:shadow-lg cursor-pointer"
          >
            Explore deals
            <img
              className="transition-transform duration-300 group-hover:translate-x-1.5 opacity-80"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
