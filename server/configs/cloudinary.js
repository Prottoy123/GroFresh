import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// তোমার cloudinary.config(...) এখানে যেমন ছিল তেমনই থাকবে

export const uploadOnCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject(new Error("No buffer provided"));

    // Cloudinary এর ডাইরেক্ট স্ট্রিম ইঞ্জিন
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "grofresh",
        resource_type: "auto",
        secure: true, // আগের সেশনের Mixed Content ওয়ার্নিং ঠেকানোর জন্য
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    // Node.js এর নেটিভ স্ট্রিম দিয়ে বাফারকে Cloudinary-তে পাঠানো হচ্ছে
    Readable.from(buffer).pipe(uploadStream);
  });
};