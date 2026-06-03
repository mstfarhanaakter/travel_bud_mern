require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED REJECTION:", error.message);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    console.log("Starting Travel Bud API...");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in Render Environment Variables");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in Render Environment Variables");
    }

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Travel Bud API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("SERVER START ERROR:", error.message);
    process.exit(1);
  }
};

startServer();