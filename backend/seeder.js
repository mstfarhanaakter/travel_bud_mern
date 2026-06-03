require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");
const Package = require("./models/Package");
const Booking = require("./models/Booking");

const packages = [
  {
    title: "Cox's Bazar Beach Escape",
    destination: "Cox's Bazar",
    country: "Bangladesh",
    price: 18500,
    duration: "3 Days / 2 Nights",
    groupSize: 12,
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Enjoy a relaxing beach holiday with sea view, local food, hotel stay, and guided sightseeing.",
    highlights: [
      "Longest sea beach experience",
      "Hotel stay near beach",
      "Sunset point visit",
      "Local seafood experience",
    ],
    included: ["Hotel", "Breakfast", "Tour guide", "Local transport"],
    isFeatured: true,
  },
  {
    title: "Sajek Valley Adventure",
    destination: "Sajek Valley",
    country: "Bangladesh",
    price: 14500,
    duration: "2 Days / 1 Night",
    groupSize: 10,
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    description:
      "A peaceful hill adventure package with resort stay, mountain views, and local cultural experience.",
    highlights: [
      "Cloud view from valley",
      "Hill resort stay",
      "Local tribal culture",
      "Adventure road trip",
    ],
    included: ["Resort", "Meals", "Transport", "Tour guide"],
    isFeatured: true,
  },
  {
    title: "Sylhet Nature Tour",
    destination: "Sylhet",
    country: "Bangladesh",
    price: 12500,
    duration: "3 Days / 2 Nights",
    groupSize: 15,
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Explore tea gardens, waterfalls, green landscapes, and peaceful natural spots in Sylhet.",
    highlights: [
      "Tea garden visit",
      "Waterfall sightseeing",
      "Nature photography",
      "Local food experience",
    ],
    included: ["Hotel", "Breakfast", "Transport", "Guide"],
    isFeatured: true,
  },
  {
    title: "Saint Martin Island Trip",
    destination: "Saint Martin",
    country: "Bangladesh",
    price: 22000,
    duration: "4 Days / 3 Nights",
    groupSize: 8,
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    description:
      "A premium island package with beach stay, coral island visit, seafood dinner, and boat journey.",
    highlights: [
      "Island beach stay",
      "Coral view",
      "Boat journey",
      "Seafood dinner",
    ],
    included: ["Hotel", "Boat ticket", "Meals", "Guide"],
    isFeatured: false,
  },
  {
    title: "Bandarban Hill Explorer",
    destination: "Bandarban",
    country: "Bangladesh",
    price: 16000,
    duration: "3 Days / 2 Nights",
    groupSize: 10,
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Explore hills, waterfalls, viewpoints, and adventure routes in beautiful Bandarban.",
    highlights: [
      "Hill trekking",
      "Waterfall visit",
      "Viewpoint tour",
      "Local culture",
    ],
    included: ["Hotel", "Transport", "Meals", "Guide"],
    isFeatured: false,
  },
  {
    title: "Dhaka City Heritage Tour",
    destination: "Dhaka",
    country: "Bangladesh",
    price: 5500,
    duration: "1 Day",
    groupSize: 20,
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
    description:
      "A short city tour covering old Dhaka, historical places, local foods, and cultural spots.",
    highlights: [
      "Old Dhaka visit",
      "Historical places",
      "Street food experience",
      "Cultural photography",
    ],
    included: ["Transport", "Guide", "Lunch"],
    isFeatured: false,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log("Deleting old data...");
    await Booking.deleteMany();
    await Package.deleteMany();
    await User.deleteMany();

    console.log("Creating demo users...");

    const admin = await User.create({
      name: "Travel Bud Admin",
      email: "admin@travelbud.com",
      password: "admin123",
      role: "admin",
      phone: "+8801000000000",
    });

    await User.create({
      name: "Demo User",
      email: "user@travelbud.com",
      password: "user123",
      role: "user",
      phone: "+8801888888888",
    });

    console.log("Creating travel packages...");

    const packagesWithAdmin = packages.map((item) => ({
      ...item,
      createdBy: admin._id,
    }));

    await Package.insertMany(packagesWithAdmin);

    console.log("Seed data inserted successfully");
    console.log("Admin login: admin@travelbud.com / admin123");
    console.log("User login: user@travelbud.com / user123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();