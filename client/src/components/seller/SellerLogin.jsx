import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function SellerLogin() {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/selleer");
    }
  }, [isSeller]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/v1/sellers/login", {
        email,
        password,
      });
      if (data) {
        setIsSeller(true);
        navigate("/selleer");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center text-sm text-gray-600"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Seller</span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#24a47c]"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Your Password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#24a47c]"
            required
          />
        </div>
        <button className="bg-[#24a47c] text-white w-full py-2 rounded-md cursor-pointer hover:bg-[#1e8a66] transition-colors disabled:opacity-50">
          Login
        </button>
      </div>
    </form>
  );
}

export default SellerLogin;
