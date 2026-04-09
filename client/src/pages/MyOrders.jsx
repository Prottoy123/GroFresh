import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyorders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/user");
      if (data.success) {
        setMyOrders(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyorders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-green-600 rounded-full "></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className=" border border-blue-600 rounded-lg mb-10 p-4 py-5 max-w-4xl bg-amber-300"
        >
          <p className=" flex justify-between md:items-center text-gray-500 md:font-medium max-md:flex-col">
            <span>orderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency} {order.amount}
            </span>
          </p>

          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`relative border-y-indigo-500 text-gray-500/70 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                order.items.length !== itemIndex + 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    // ম্যাজিক ফিক্স ১: item.product ব্যবহার এবং http -> https কনভার্সন
                    src={item.product?.image[0]?.replace("http://", "https://")}
                    alt={item.product?.name || "Product Image"}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item.product?.name || "Product Unavailable"}
                  </h2>
                  <p>Category: {item.product?.category || "N/A"} </p>
                </div>
              </div>

              <div className="text-primary text-lg font-medium flex flex-col justify-center md:ml-8 mb:mb-0">
                <p>Quantity: {item.quantity || "1"} </p>
                <p>Status: {order.status} </p>
                {/* ম্যাজিক ফিক্স ২: Date ফাংশন কল করা হলো () দিয়ে */}
                <p>Date: {new Date(order.createdAt).toLocaleDateString()} </p>
              </div>
              <p className="text-primary text-lg font-medium">
                Amount: {currency}
                {(item.product?.offerPrice || 0) * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
