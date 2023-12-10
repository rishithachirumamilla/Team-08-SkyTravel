const mongoose = require("mongoose");
const Booking = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      }
    ,
 
    flight_info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "routes",
        required: true,
      },
      pnr: {
        type: String,
        unique:true,
        required: true,
      },
      travel_class: {
        type: String,
        required: true,
      },
      seat_number: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      nationality: {
        type: String,
        required: true,
      },
      passportNumber: {
        type: String,
        required: true,
      }
    
    });
  
  
Booking.index({ pnr: 1 }, { unique: true });

module.exports = Bookings =  mongoose.model("Bookings",Booking)