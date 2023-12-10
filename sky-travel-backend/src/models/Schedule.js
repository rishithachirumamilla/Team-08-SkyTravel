const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema(
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
    _route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "route",
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);
