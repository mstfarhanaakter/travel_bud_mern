const Booking = require('../models/Booking');
const Package = require('../models/Package');

const createBooking = async (req, res, next) => {
  try {
    const { packageId, travelerName, travelerEmail, phone, travelDate, travelers, note } = req.body;

    const travelPackage = await Package.findById(packageId);
    if (!travelPackage) {
      res.status(404);
      throw new Error('Package not found');
    }

    const travelerCount = Number(travelers) || 1;

    const booking = await Booking.create({
      package: travelPackage._id,
      user: req.user._id,
      packageTitle: travelPackage.title,
      packageImage: travelPackage.image,
      destination: `${travelPackage.destination}, ${travelPackage.country}`,
      price: travelPackage.price,
      travelerName,
      travelerEmail,
      phone,
      travelDate,
      travelers: travelerCount,
      totalPrice: travelPackage.price * travelerCount,
      note
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('package', 'title destination country')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      res.status(400);
      throw new Error('Invalid booking status');
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

const cancelMyBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    if (booking.status === 'completed') {
      res.status(400);
      throw new Error('Completed booking cannot be cancelled');
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelMyBooking
};
