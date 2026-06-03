const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  console.log("ENV CHECK:");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("MONGO_URI exists:", Boolean(mongoUri));
  console.log("JWT_SECRET exists:", Boolean(process.env.JWT_SECRET));

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in Render Environment Variables");
  }

  if (
    mongoUri.includes("YOUR_PASSWORD") ||
    mongoUri.includes("xxxxx") ||
    mongoUri.includes("<db_password>")
  ) {
    throw new Error("MONGO_URI still has placeholder values");
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error event:", error.message);
  });

  const conn = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 20000,
  });

  console.log(`MongoDB connected successfully: ${conn.connection.host}`);
};

module.exports = connectDB;