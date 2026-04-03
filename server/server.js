import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from "./routes/user.Route.js";
import sellerRouter from './routes/seller.Route.js';
import cartRouter from './routes/cart.Route.js';
import addressRouter from './routes/adress.Route.js';

const app = express()
const port = process.env.PORT || 4000;
await connectDB()

//Allow multiple origins
const allowedOrigins = ["http://localhost:5173"]

//Middleware Configuration
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get('/',(req,res)=>{res.send("API is working")})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/Product", ProductRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/address", addressRouter);

app.listen(port,()=> {
    console.log(`Server is runnign on http://localhost:${port}`);
    
})