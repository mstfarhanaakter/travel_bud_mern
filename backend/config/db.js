const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing");
  }

  if (
    mongoUri.includes("YOUR_PASSWORD") ||
    mongoUri.includes("xxxxx") ||
    mongoUri.includes("<db_password>")
  ) {
    throw new Error("MONGO_URI still has placeholder values");
  }

  const conn = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 20000,
  });

  console.log(`MongoDB connected successfully: ${conn.connection.host}`);
};

module.exports = connectDB;