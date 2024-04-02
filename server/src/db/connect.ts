import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export default function connectDB() {
  return mongoose.connect(String(process.env.MONGO_URI));
}
