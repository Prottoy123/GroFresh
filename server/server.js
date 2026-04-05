import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";

import userRouter from "./routes/user.Route.js";
import sellerRouter from "./routes/seller.Route.js";
import cartRouter from "./routes/cart.Route.js";
import ProductRouter from "./routes/product.Route.js"; 
import orderRouter from "./routes/order.Route.js";
import addressRouter from "./routes/adress.Route.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173"];

// 2. Middleware Configuration (Industry Standard)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); 

app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("GROFRESH API is fully operational");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/sellers", sellerRouter);
app.use("/api/v1/products", ProductRouter); 
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/order", orderRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `🚀 Server is running flawlessly on http://localhost:${port}`,
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !!!", err);
    process.exit(1);
  });
