import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ProductList() {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.patch(`/api/v1/products/stock/${id}`, {
        inStock,
      });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // Main container with consistent gradient background
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-start bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-100/40 p-4 md:p-10">
      {/* Page Header Area */}
      <div className="max-w-6xl w-full mx-auto mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-teal-600 tracking-tight">
            Inventory Management
          </h2>
          <p className="text-base text-gray-600 mt-2 font-medium">
            Track and update your product catalog
          </p>
        </div>
        <span className="text-base font-bold text-teal-700 bg-teal-100/80 px-5 py-2 rounded-full shadow-sm border border-teal-200">
          Total Products: {products?.length || 0}
        </span>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Glassmorphism table container */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(34,197,94,0.06)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              {/* Table Header Configuration */}
              <thead className="bg-green-50/50 text-green-800 text-sm uppercase tracking-widest font-extrabold border-b border-green-100">
                <tr>
                  <th className="px-6 py-5 rounded-tl-2xl">Product Info</th>
                  <th className="px-6 py-5">Category</th>
                  <th className="px-6 py-5 text-center">Selling Price</th>
                  <th className="px-6 py-5 text-center rounded-tr-2xl">
                    Availability
                  </th>
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody className="divide-y divide-gray-100/50">
                {products?.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-white/80 transition-colors duration-200"
                  >
                    {/* Product Identity Column */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-1 flex-shrink-0 shadow-sm overflow-hidden group">
                          <img
                            src={product.image[0]?.replace(
                              "http://",
                              "https://",
                            )}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-bold text-gray-800 line-clamp-1">
                            {product.name}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">
                            ID: #{product._id.substring(0, 8)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-bold bg-gray-100 text-gray-600 border border-gray-200">
                        {product.category}
                      </span>
                    </td>

                    {/* Pricing Column */}
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-black text-gray-800">
                          {currency}
                          {product.offerPrice.toLocaleString()}
                        </span>
                        {product.price > product.offerPrice && (
                          <span className="text-xs text-gray-400 line-through font-bold">
                            {currency}
                            {product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                          onChange={() => {
                            toggleStock(product._id, !product.inStock);
                          }}
                          checked={product.inStock}
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-400 peer-checked:to-teal-500 shadow-inner"></div>
                        <span className="ml-3 text-sm font-bold text-gray-600 group-hover:text-gray-800">
                          In Stock
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State UI */}
            {products?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">📦</span>
                <p className="text-xl font-black text-gray-800">
                  No Products Found
                </p>
                <p className="text-base text-gray-500 mt-2 font-medium">
                  Add some products to see them listed here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
