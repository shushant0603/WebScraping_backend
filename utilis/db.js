import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI 

 export const connectDB = async () => {
  try {
    await mongoose.connect("");
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Error ❌", error);
  }
};