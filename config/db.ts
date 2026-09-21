import mongoose from "mongoose";

type MongoUriEnv = "MONGODB_URI" | "MONGO_URI";

const getMongoUri = (): string | undefined => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  return uri && uri.trim() ? uri : undefined;
};

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    console.warn(
      "MongoDB URI not configured. Skipping database connection. Set MONGODB_URI in .env.local to enable persistence."
    );
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    console.warn("The app will keep running without the database for local UI testing.");
  }
};

export default connectDB;