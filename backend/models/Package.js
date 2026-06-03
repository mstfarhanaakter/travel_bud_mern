const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be greater than 0']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required']
    },
    groupSize: {
      type: Number,
      default: 10
    },
    category: {
      type: String,
      enum: ['Adventure', 'Beach', 'City', 'Culture', 'Family', 'Honeymoon', 'Nature'],
      default: 'Adventure'
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    highlights: {
      type: [String],
      default: []
    },
    included: {
      type: [String],
      default: []
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
