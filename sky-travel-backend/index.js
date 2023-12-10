const express = require("express");
const passport = require("passport");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
const connectToDB = require("./src/helpers/databaseConnection");
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const app = express();
const axios = require('axios');
var data_html = {};
//Basic Setup
app.use(cors({ origin: "http://localhost:3000",
credentials: true,}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.use(express.json());
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
connectToDB();

const PORT = process.env.PORT || 5000;

// routes connection
app.use("/apis", require("./src/routes/Apis"));
app.use("/user", require("./src/routes/User"));
app.use("/airline", require("./src/routes/Airline"));
const Route = require('./src/models/Route');

// Fetch routes from the database
app.get('/api/routes', async (req, res) => {
  try {
    const routes = await Route.find();
    // console.log("inside api");
    // console.log(routes);
    res.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const User = require("./src/models/User");
app.get('/api/user/details/:userId', async (req, res) => {
    try {
        const userEmail = req.params.userId;
        console.log(userEmail);
        // Fetch user details from your MongoDB based on the user's email
        const user = await User.findOne({ email: userEmail });
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Send the user details in the response
        res.json({ user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
const Schedule = require("./src/models/Schedule"); 
const Booking = require("./src/models/Bookings.js");
const CST = require("./src/models/Customersupportickets.js");
const Flight = require("./src/models/Flight.js");

app.post('/api/savebooking', async (req, res) => {
  try {
  
   
    const { userid, flightinfo, pnr, travelclass, seatnumber, price, age, gender, nationality, passportNumber } = req.body;
    const pnrexists = await Booking.findOne({pnr:pnr});
    if(pnrexists){
      return res.status(400).json({message: "pnr already exists!"});
    }
    const schdid = await Schedule.findById(flightinfo);
    const flight = await Flight.findOne({ _id: schdid._flight });
    let travelClass;
    if(travelclass==='Economy'){
       travelClass = "economy"
    }else if(travelclass==='Business'){
       travelClass = "business"
    }else{
       travelClass= "firstClass";
    }
    console.log("flight",flight)
    // Check seat availability based on the selected travel class
    if (flight[`${travelClass}Available`] <= 0) {
      return res.status(400).json({ success: false, message: "No available seats in the selected travel class" });
    }

    // Create a new booking instance
    const booking = new Booking({
      user_id: userid,
      flight_info: flightinfo,
      pnr: pnr,
      travel_class: travelclass,
      seat_number: seatnumber,
      price: price,
      age: age,
      gender: gender,
      nationality: nationality,
      passportNumber: passportNumber,
    });

    await Flight.findOneAndUpdate(
      { _id: flight._id, [`${travelClass}Available`]: { $gt: 0 } },
      { $inc: { [`${travelClass}Available`]: -1 } }
    );

    // Save the booking to the database
    await booking.save();

    // Send a response
    res.status(200).json({ success: true, message: "Booking saved successfully" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
 app.post('/api/sendemail', async (req,res)=>{
  try{
    const { userid, flightinfo, pnr, travelclass, seatnumber, price } = req.body
    console.log("got the pnr : ", pnr)
    const htmlTemplate = fs.readFileSync('tickettemplate.ejs', 'utf-8');
    const apiUrl = `http://localhost:5000/api/getdatabypnr/${pnr}`;
    const { data } = await axios.get(apiUrl);
    data.schedule.departureTime = new Date(data.schedule.departureTime);
    data.schedule.arrivalTime = new Date(data.schedule.arrivalTime);
    // Render the template with the data
    const renderedHtml = ejs.render(htmlTemplate, { user: data.user, flight: data.flight, route:data.route, schedule: data.schedule, booking: data.booking });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.FROM_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });
    var mailOptions = {
      from: 'lakshman manesh',
      to: data.user.email,
      subject: "SKY Travel: Booking Confirmation",
      html: renderedHtml
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);

      }
      else{
        console.log("Email sent" + info.response);
      }
    })
return res.status(200).json({message:"Email send success"})
  }
  catch(error)
  {
    console.log("Error in sending email", error);
    return res.status(500).json({message:"Email send failed"})
  }
 })
 app.get('/api/getdatabypnr/:pnr', async (req, res) => {
  try {
    //const { pnr } = req.body;
    const pnr = req.params.pnr;

    // Find the booking based on the PNR
    const booking = await Booking.findOne({ pnr })//.populate('user_id flight_info');

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Log some information for troubleshooting
    console.log("Booking:", booking);
    console.log("Booking.flight_info:", booking.flight_info);

    // Extract user_id and flight_info from the booking
    const { user_id, flight_info } = booking;

    // Log additional information
    console.log("Flight_info._id:", flight_info._id);

    // Find schedule using flight_info._id
    const schedule = await Schedule.findById( flight_info )//.populate('_flight _route _airline');

    // Log schedule information
    console.log("Schedule:", schedule);

    if (!schedule) {
      // Handle the case where Schedule is not found
      console.error('Schedule not found for the provided _flight ID');
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    // Find user, route, and flight details using the extracted ids
    const user = await User.findById(user_id);
    const route = await Route.findById(schedule._route);
    const flight = await Flight.findOne({ _airline: route._airline }).populate('_airline');

    return res.json({
      booking,
      user,
      route,
      schedule,
      flight,
    });
  } catch (error) {
    console.error('Error fetching data by PNR:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.get('/api/bookings/user/:currentUser', async (req, res) => {
  try {
    const currentUser = req.params.currentUser;
    const userExists = await User.findOne({ email: currentUser });

    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userId = userExists._id;

    // Find all bookings based on the user ID
    const bookings = await Booking.find({ user_id: userId });

    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'Bookings not found for the user' });
    }

    // Log some information for troubleshooting
   // console.log("Bookings:", bookings);

    // Process each booking
    const result = [];

    for (const booking of bookings) {
      // Extract user_id and flight_info from the booking
      const { user_id, flight_info } = booking;

      // Log additional information
      //console.log("Flight_info._id:", flight_info._id);

      // Find schedule using flight_info._id
      const schedule = await Schedule.findById(flight_info);

      // Log schedule information
      //console.log("Schedule:", schedule);

      if (!schedule) {
        // Handle the case where Schedule is not found
        continue;
        console.error('Schedule not found for the provided _flight ID');
        return res.status(404).json({ success: false, message: 'Schedule not found' });
      }

      // Find user, route, and flight details using the extracted ids
      const user = await User.findById(user_id);
      const route = await Route.findById(schedule._route);
      const flight = await Flight.findOne({ _airline: route._airline }).populate('_airline');

      result.push({
        booking,
        user,
        route,
        schedule,
        flight,
      });
    }

    return res.json(result);
  } catch (error) {
    console.error('Error fetching data by user ID:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/api/bookings/cancel/user/:bookingId", async(req,res)=>{
  try{
  const bookingId = req.params.bookingId;
  const pnr_ = await Booking.findOne({_id:bookingId})
  
  const htmlTemplate = fs.readFileSync('cancellationconfirmation.ejs', 'utf-8');
  const apiUrl = `http://localhost:5000/api/getdatabypnr/${pnr_.pnr}`;
  const { data } = await axios.get(apiUrl);
  data.schedule.departureTime = new Date(data.schedule.departureTime);
  data.schedule.arrivalTime = new Date(data.schedule.arrivalTime);
  // Render the template with the data
  const renderedHtml = ejs.render(htmlTemplate, { user: data.user, flight: data.flight, route:data.route, schedule: data.schedule, booking: data.booking });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: process.env.FROM_EMAIL,
      pass: process.env.APP_PASSWORD
    }
  });
  var mailOptions = {
    from: 'lakshman manesh',
    to: data.user.email,
    subject: "SKY Travel: Cancellation Confirmation",
    html: renderedHtml
  };
  transporter.sendMail(mailOptions,function(error,info){
    if(error){
      console.log(error);

    }
    else{
      console.log("Email sent" + info.response);
    }
  })
  const booking = await Booking.deleteOne({_id: bookingId});
  res.status(200).json({success: true});
  
  }
  catch(error){
    res.status(400).json({success: false});
    console.log("Error deleting booking", error);
  }
});

app.post('/api/bookings/supportticket/user/saveticket', async (req,res)=>{
try{
const {name , email, message,pnr, ticket_ref} = req.body;
const cst = new CST({
  name:name,
  email:email,
  message:message,
  pnr:pnr,
  ticket_ref:ticket_ref,
  status:"open",
});
await cst.save();
return res.status(200).json({message:"success"});
}
catch(error){
return res.status(500).json({message:"failed"});
}
});
app.get("/api/support-tickets", async(req,res)=>{
  try{
    const tickets = await CST.find({status:"open"});
    console.log(tickets);
    return res.status(200).json({tickets});
  }
  catch(error){
    console.log("Error in get support-tickets",error);
    res.status(400);

  }

});
app.get("/api/support-tickets/:ticketId", async(req,res)=>{

  try{
    const ticketId = req.params.ticketId;
  const ticket = await CST.findById(ticketId);
  return res.status(200).json({ticket:ticket})

  }
  catch(error){
console.log("error gettig ticket by Id", error);
return res.status(500);
  }
});

app.post("/api/support-tickets/:ticketId/reply", async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { reply } = req.body;

    // Find the ticket by ID
    const findTicket = await CST.findById(ticketId);

    if (!findTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Update the replies array or property in your CST model
    findTicket.reply = reply;
    findTicket.created_date = new Date();
    findTicket.updated_date = new Date();
    findTicket.status = "closed";
    const htmlTemplate = fs.readFileSync('customersupportreply.ejs', 'utf-8');
    const renderedHtml = ejs.render(htmlTemplate,{ticket:findTicket})
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.FROM_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });
    var mailOptions = {
      from: 'SKY TRAVEL',
      to: findTicket.email,
      subject: "SKY Travel: Customer Support "+`${findTicket.ticket_ref}`,
      html: renderedHtml
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);

      }
      else{
        console.log("Email sent" + info.response);
      }
    })
    // Save the updated ticket
    const updatedTicket = await findTicket.save();

    // Send the updated ticket as a response
    res.json(updatedTicket);
  } catch (error) {
    console.log("Error sending reply:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/getflightname/:flightId', async(req,res)=>{
try{
const flightId = req.params.flightId;
const flight = await Flight.findOne({_id:flightId})

console.log(flight)
return res.json(flight.title)
}
catch(error){
return res.status(500)

}
});
//Payment
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const {amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: amount*100,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});


app.post("/api/user/sendupdatedemailbulk", async (req, res) => {
  try {
   
    const { form } = req.body;
    
    if (!form || !form._id) {
      return res.status(400).json({ message: "Invalid request data. Missing _id." });
    }

    const { _id, departureTime, arrivalTime, _route, _flight } = form;
    const bookinginfos = await Booking.find({ flight_info: _id });
    
    // Create an array to store promises for each API call
    const apiRequests = bookinginfos.map(async (booking) => {
      const pnr = booking.pnr; // Assuming 'pnr' is the property you want to use

      // Make API call for each booking
      const apiUrl = `http://localhost:5000/api/getdatabypnr/${pnr}`;
      const apiResponse = await axios.get(apiUrl);

      // Handle the response as needed
      console.log(`Response for booking with PNR ${pnr}:`, apiResponse.data);

      return apiResponse.data; // You can return any data you want to collect from each API call
    });

    // Wait for all API calls to complete
    const results = await Promise.all(apiRequests);
    const htmlTemplate = fs.readFileSync('flightupdatetemplate.ejs', 'utf-8');
  results.map(async (data) => {
    data.schedule.departureTime = new Date(data.schedule.departureTime);
    data.schedule.arrivalTime = new Date(data.schedule.arrivalTime);
    // Render the template with the data
    const renderedHtml = ejs.render(htmlTemplate, { user: data.user, flight: data.flight, route:data.route, schedule: data.schedule, booking: data.booking });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.FROM_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });
    var mailOptions = {
      from: 'SKY TRAVEL',
      to: data.user.email,
      subject: "SKY Travel: Flight Updated",
      html: renderedHtml
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);

      }
      else{
        console.log("Email sent" + info.response);
      }
    })
  })
    // Do something with the results if needed

    res.status(200).json({ message: "Bulk emails sent successfully", results });
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    res.status(500).json({ message: "Failed to send bulk email" });
  }
});
app.post("/api/user/sendcancelledemailbulk/:schedule", async (req, res) => {
  try {
   
    // const { form } = req.body;
    const _id = req.params.schedule;
    console.log(_id)
    // if (!form || !form._id) {
    //   return res.status(400).json({ message: "Invalid request data. Missing _id." });
    // }

    // const { _id, departureTime, arrivalTime, _route, _flight } = form;
    const bookinginfos = await Booking.find({ flight_info: _id });
    
    // Create an array to store promises for each API call
    const apiRequests = bookinginfos.map(async (booking) => {
      const pnr = booking.pnr; // Assuming 'pnr' is the property you want to use

      // Make API call for each booking
      const apiUrl = `http://localhost:5000/api/getdatabypnr/${pnr}`;
      const apiResponse = await axios.get(apiUrl);

      // Handle the response as needed
      console.log(`Response for booking with PNR ${pnr}:`, apiResponse.data);

      return apiResponse.data; // You can return any data you want to collect from each API call
    });

    // Wait for all API calls to complete
    const results = await Promise.all(apiRequests);
    const htmlTemplate = fs.readFileSync('cancellationbyairline.ejs', 'utf-8');
  results.map(async (data) => {
    data.schedule.departureTime = new Date(data.schedule.departureTime);
    data.schedule.arrivalTime = new Date(data.schedule.arrivalTime);
    // Render the template with the data
    const renderedHtml = ejs.render(htmlTemplate, { user: data.user, flight: data.flight, route:data.route, schedule: data.schedule, booking: data.booking });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.FROM_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });
    var mailOptions = {
      from: 'SKY TRAVEL',
      to: data.user.email,
      subject: "SKY Travel: Flight Cancelled",
      html: renderedHtml
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);

      }
      else{
        console.log("Email sent" + info.response);
      }
    })
  })
    // Do something with the results if needed

    res.status(200).json({ message: "Bulk emails sent successfully", results });
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    res.status(500).json({ message: "Failed to send bulk email" });
  }
});
app.listen(PORT, () => console.log(`App is listening at port ${PORT}`));
