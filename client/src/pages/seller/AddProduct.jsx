import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // API Call logic will go here
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-start bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-100/40 p-6 md:p-12">
      {/* Page Header */}
      <div className="max-w-4xl w-full mx-auto mb-8 text-center md:text-left">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-teal-600 tracking-tight">
          Add New Product
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Expand your inventory with fresh items
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="max-w-4xl w-full mx-auto bg-white/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] shadow-[0_8px_40px_rgba(34,197,94,0.08)] border border-white/60 space-y-8"
      >
        {/* Image Upload Section */}
        <div className="bg-white/50 p-6 rounded-2xl border border-white/80 shadow-sm">
          <label className="text-sm font-extrabold text-gray-700 mb-4 block uppercase tracking-wider">
            Product Gallery
          </label>
          <div className="flex flex-wrap items-center gap-5">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="group relative cursor-pointer flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-green-300/70 rounded-2xl bg-gradient-to-b from-green-50/50 to-white hover:from-green-100 hover:to-green-50 hover:border-green-500 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  {files[index] ? (
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(files[index])}
                      alt={`upload-${index}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-300">
                      <img
                        src={assets.upload_area}
                        alt="upload"
                        className="w-8 h-8 mb-2 drop-shadow-sm"
                      />
                      <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">
                        Upload
                      </span>
                    </div>
                  )}
                </label>
              ))}
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Product Name */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label
              className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1"
              htmlFor="product-name"
            >
              Product Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="product-name"
              type="text"
              placeholder="e.g., Fresh Organic Tomatoes"
              className="w-full bg-white/70 border border-white/80 text-gray-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-400 block p-4 shadow-sm transition-all duration-300 outline-none"
              required
            />
          </div>
          {/* Product Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label
              className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1"
              htmlFor="product-description"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="product-description"
              rows={4}
              className="w-full bg-white/70 border border-white/80 text-gray-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-400 block p-4 shadow-sm transition-all duration-300 outline-none resize-none"
              placeholder="Highlight the key benefits..."
            ></textarea>
          </div>
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1"
              htmlFor="category"
            >
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              id="category"
              className="w-full bg-white/70 border border-white/80 text-gray-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-400 block p-4 shadow-sm transition-all duration-300 outline-none cursor-pointer appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item.path}>
                  {item.path}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden md:block"></div> {/* Spacer */}
          {/* Regular Price */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1"
              htmlFor="product-price"
            >
              Regular Price
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-green-600 font-black text-lg">
                $
              </span>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                id="product-price"
                type="number"
                placeholder="0.00"
                className="w-full bg-white/70 border border-white/80 text-gray-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-400 block p-4 pl-10 shadow-sm transition-all duration-300 outline-none font-medium"
                required
              />
            </div>
          </div>
          {/* Offer Price */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-teal-600 font-black text-lg">
                $
              </span>
              <input
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                id="offer-price"
                type="number"
                placeholder="0.00"
                className="w-full bg-white/70 border border-white/80 text-gray-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-400 block p-4 pl-10 shadow-sm transition-all duration-300 outline-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 mt-4">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-lg rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest"
          >
            Launch Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
