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

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MONGODB CONNECTION FAILED");
    console.error("ERROR NAME:", error.name);
    console.error("ERROR MESSAGE:", error.message);
    throw error;
  }
};

module.exports = connectDB;