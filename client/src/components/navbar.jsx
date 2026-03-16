import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const GroceryNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    user,
    setuser,
    setShowUserLogin,
    navigate,
    setsearchQuery,
    searchQuery,
    getCartAmount,
    getCartCount
  } = useAppContext();

  const logout = async () => {
    setuser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
      
    }
    
    
  }, [searchQuery])
  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-12 py-3 ${
        scrolled ? "bg-green-300 backdrop-blur-lg shadow-sm" : "bg-green-300"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Fresh Logo Section */}
        <NavLink
          to={"/"}
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 group"
        >
          <img className="h-9" src={assets.logo} alt="logo" />
        </NavLink>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-10">
          <div className="relative w-full group">
            <input
              onChange={(e) => setsearchQuery(e.target.value)}
              type="text"
              placeholder="Search fresh vegetables, fruits..."
              className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
            />
            <svg
              className="absolute left-4 top-3 text-slate-400 group-focus-within:text-emerald-500"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right Section: Desktop Menu, Cart & Toggle */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
            <NavLink to="/" className="hover:text-emerald-600 transition">
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="hover:text-emerald-600 transition"
            >
              All Product
            </NavLink>
            <NavLink to="/" className="hover:text-emerald-600 transition">
              Hot Deals
            </NavLink>
          </div>

          {/* Cart Icon */}
          <div
            onClick={() => navigate("/cart")}
            className="relative p-2.5 bg-slate-100 rounded-full cursor-pointer hover:bg-emerald-50 transition-colors group"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>

          {/* Desktop Sign In */}
          {!user ? (
            <button
              onClick={() => {
                setShowUserLogin(true);
              }}
              className="hidden sm:block px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 shadow-lg shadow-slate-200 hover:shadow-emerald-200 transition-all active:scale-95"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10" alt="" />
              <ul
                className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border
              border-gray-200 py-2. w-30 rounded-md text-sm z-40"
              >
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  My orders
                </li>
                <li
                  onClick={logout}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Toggle Icon */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-800"
          >
            <img src={assets.menu_icon} alt="menu" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-[70px] left-0 w-full bg-white border-b shadow-xl transition-all duration-300 overflow-hidden ${
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {open && (
          <div className="p-6 flex flex-col gap-4 font-semibold text-slate-700">
            <NavLink onClick={() => setOpen(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/products">
              All Product
            </NavLink>
            {user && (
              <NavLink onClick={() => setOpen(false)} to="/products">
                My orders
              </NavLink>
            )}
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl active:scale-95 transition-transform"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl active:scale-95 transition-transform"
              >
                LogOut
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default GroceryNavbar;
