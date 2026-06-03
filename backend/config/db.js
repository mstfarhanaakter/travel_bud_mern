const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    if (
      mongoUri.includes("YOUR_USERNAME") ||
      mongoUri.includes("YOUR_PASSWORD") ||
      mongoUri.includes("YOUR_REAL_CLUSTER") ||
      mongoUri.includes("YOUR_CLUSTER") ||
      mongoUri.includes("<db_password>")
    ) {
      throw new Error(
        "Please replace placeholder values in MONGO_URI with your real MongoDB Atlas username, password, and cluster URL"
      );
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;