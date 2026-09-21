import mongoose from "mongoose";

export default async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MongoDB is not configured. Student profile routes will be unavailable.");
    return;
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}