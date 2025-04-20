import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://0.0.0.0:27017/medClaim");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
