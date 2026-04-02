import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ Error: MONGODB_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    // 2. Await Connection & Log Host
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/grofresh`,
    );

    console.log(
      `✅ Database Connected Successfully! DB Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("❌ MONGODB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
