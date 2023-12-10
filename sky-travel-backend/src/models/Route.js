const mongoose = require("mongoose");

const RouteSchema = mongoose.Schema(
  {
    _airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airline",
      required: true,
    },
    _flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flight",
      required: true,
    },
    departure: {
      airport: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
    },
    destination: {
      airport: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
    },
    economyPricing: {
      type: Number,
      default: 0,
    },
    businessPricing: {
      type: Number,
      default: 0,
    },
    firstClassPricing: {
      type: Number,
      default: 0,
    },
    stops: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Route = mongoose.model("route", RouteSchema);
