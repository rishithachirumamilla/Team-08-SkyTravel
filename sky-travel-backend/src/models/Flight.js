const mongoose = require("mongoose");

const FlightSchema = mongoose.Schema(
  {
    _airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airline",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    flightNumber: {
      type: String,
      required: true,
      trim: true,
    },
    economyCapacity: {
      type: Number,
      required: true,
    },
    businessCapacity: {
      type: Number,
      required: true,
    },
    firstClassCapacity: {
      type: Number,
      required: true,
    },
    economyAvailable: {
      type: Number,
      required: false,
    },
    businessAvailable: {
      type: Number,
      required: false,
    },
    firstClassAvailable: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Flight = mongoose.model("flight", FlightSchema);
