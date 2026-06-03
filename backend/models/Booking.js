const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    packageTitle: {
      type: String,
      required: true
    },
    packageImage: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    travelerName: {
      type: String,
      required: [true, 'Traveler name is required']
    },
    travelerEmail: {
      type: String,
      required: [true, 'Traveler email is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required']
    },
    travelers: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    },
    totalPrice: {
      type: Number,
      required: true
    },
    note: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
