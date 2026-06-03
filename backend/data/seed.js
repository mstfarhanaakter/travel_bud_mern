const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Package = require('../models/Package');
const Booking = require('../models/Booking');
const samplePackages = require('./samplePackages');

const seedData = async () => {
  try {
    await connectDB();

    await Booking.deleteMany();
    await Package.deleteMany();
    await User.deleteMany();

    const admin = await User.create({
      name: 'Travel Bud Admin',
      email: 'admin@travelbud.com',
      password: 'admin123',
      role: 'admin',
      phone: '+8801000000000'
    });

    const user = await User.create({
      name: 'Demo User',
      email: 'user@travelbud.com',
      password: 'user123',
      role: 'user',
      phone: '+8801888888888'
    });

    const packagesWithAdmin = samplePackages.map((item) => ({ ...item, createdBy: admin._id }));
    await Package.insertMany(packagesWithAdmin);

    console.log('Seed data inserted successfully');
    console.log('Admin login: admin@travelbud.com / admin123');
    console.log('User login: user@travelbud.com / user123');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
