const express = require("express");

const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://travel-bud-mern.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

// CORS must be before all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;

  const isAllowedOrigin =
    !origin ||
    allowedOrigins.includes(origin) ||
    origin.endsWith(".vercel.app");

  if (isAllowedOrigin && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel Bud API is running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Travel Bud API base route is working",
    routes: {
      health: "/api/health",
      auth: "/api/auth",
      packages: "/api/packages",
      bookings: "/api/bookings",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Travel Bud backend and database connected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

module.exports = app;