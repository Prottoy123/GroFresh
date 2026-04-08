import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";
import toast from "react-hot-toast";

function Orders() {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/seller");
      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    // ১. ব্যাকগ্রাউন্ডে সূক্ষ্ম গ্রেডিয়েন্ট যোগ করা হয়েছে (Organic Feel)
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-gradient-to-br from-green-50/50 via-slate-50 to-green-100/40">
      <div className="md:p-10 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center pb-6 border-b border-green-200/50">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Orders Overview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track your customer orders
            </p>
          </div>
          <span className="text-sm font-bold text-green-700 bg-green-100/80 px-5 py-2 rounded-xl shadow-sm border border-green-200 backdrop-blur-sm">
            Total Orders: {orders?.length || 0}
          </span>
        </div>

        {/* Orders List */}
        <div className="space-y-5 mt-4">
          {orders?.map((order, index) => (
            <div
              key={index}
              // ২. কার্ডে 3D ভাসমান এফেক্ট, কালারড শ্যাডো এবং হোভার ট্রানজিশন
              className="group flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 bg-white rounded-2xl border-l-4 border-l-green-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Product Info Section */}
              <div className="flex gap-5 md:w-1/3 items-center">
                <div className="bg-gradient-to-tr from-green-100 to-green-50 p-3.5 rounded-2xl shadow-inner border border-green-100 group-hover:scale-105 transition-transform duration-300">
                  <img
                    className="w-10 h-10 object-contain drop-shadow-sm"
                    src={assets.box_icon}
                    alt="boxIcon"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-1.5">
                  {order.items.map((item, i) => (
                    <p
                      key={i}
                      className="font-semibold text-gray-800 text-[15px]"
                    >
                      {item.product.name}{" "}
                      <span className="text-green-700 bg-green-50/80 font-bold px-2.5 py-0.5 rounded-md text-xs ml-1 border border-green-100">
                        x {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="text-sm text-gray-600 md:w-1/3 space-y-1 border-l-2 border-gray-100 pl-4 md:pl-6">
                <p className="font-bold text-gray-800 mb-1.5 text-[15px]">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="truncate text-gray-500">
                  {order.address.street}, {order.address.city}
                </p>
                <p className="text-gray-500">
                  {order.address.state}, {order.address.zipcode}
                </p>
                <p className="text-gray-600 mt-2 flex items-center gap-1.5 font-medium bg-gray-50 w-fit px-2 py-1 rounded-md">
                  📞 {order.address.phone}
                </p>
              </div>

              {/* Price & Method Section */}
              <div className="flex flex-col items-start md:items-end justify-center md:w-1/6">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                  Total Amount
                </p>
                <p className="text-2xl font-black text-gray-800 drop-shadow-sm">
                  {currency}
                  {order.amount.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-gray-500 mt-1.5 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-wide">
                  {order.paymentType}
                </p>
              </div>

              {/* Status Section */}
              <div className="flex flex-col items-start md:items-end gap-3 md:w-1/6 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <span
                  className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase shadow-sm
                    ${
                      order.isPaid
                        ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-green-200"
                        : "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-orange-200"
                    }`}
                >
                  {order.isPaid ? "✓ PAID" : "⧗ PENDING"}
                </span>
                <p className="text-xs text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded-md">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
