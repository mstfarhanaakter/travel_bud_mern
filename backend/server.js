require("dotenv").config();

process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED REJECTION:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log("Starting Travel Bud API...");

  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Travel Bud API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("SERVER START ERROR NAME:", error.name);
    console.error("SERVER START ERROR MESSAGE:", error.message);
    console.error("SERVER START ERROR STACK:", error.stack);
    process.exit(1);
  }
};

startServer();