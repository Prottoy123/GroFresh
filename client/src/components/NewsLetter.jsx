import React from "react";

function NewsLetter() {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl lg:w-full rounded-3xl px-6 py-12 md:py-20 mx-2 lg:mx-auto my-30 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 shadow-xl shadow-emerald-900/5 border border-emerald-100 relative overflow-hidden">
      {/* Background Decorative Circles for Uniqueness */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-200/30 rounded-full -translate-x-10 -translate-y-10 blur-2xl">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.

</div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-200/30 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>

      <div className="flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="text-4xl md:text-[44px] font-bold text-emerald-900 tracking-tight">
          Stay Inspired
        </h1>
        <p className="text-sm md:text-base text-emerald-700/80 mt-3 max-w-xl font-medium">
          Join our newsletter and be the first to discover new updates,
          exclusive offers, and inspiration.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-8 w-full relative z-10">
        <input
          type="email"
          className="bg-white px-5 py-3.5 border border-emerald-200 rounded-xl outline-none max-w-sm w-full shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-emerald-900 placeholder:text-emerald-300"
          placeholder="Enter your email"
        />
        <button className="flex items-center justify-center gap-2 group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-semibold active:scale-95 transition-all shadow-lg shadow-emerald-600/20">
          Subscribe
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      <p className="text-emerald-600/60 mt-8 text-xs text-center font-medium relative z-10">
        By subscribing, you agree to our{" "}
        <span className="underline cursor-pointer hover:text-emerald-700 transition-colors">
          Privacy Policy
        </span>{" "}
        and consent to receive updates.
      </p>
    </div>
  );
}

export default NewsLetter;
