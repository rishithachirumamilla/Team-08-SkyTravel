// PassengerInfoForm.js
import React, { useState, useEffect } from "react";
import CSmButton from "../../../../components/form/CSmButton";
import "./PassengerInfoForm.css";
import { createBrowserHistory } from 'history';
import { Link } from "react-router-dom";
import Payment from "../../Bookings/Payment";
import { BACKEND_BASE_URL } from "../../../../helpers/variables";
//import { Elements } from "react-stripe-elements";
const history = createBrowserHistory();

export const getUserDetails = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/details/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

const PassengerInfoForm = (props) => {
  const { state } = props.location || {};
  const storedFlightData = JSON.parse(localStorage.getItem("selectedFlight"));

  const { _keyid,
    departure,
    destination,
    departureTime,
    arrivalTime,
    airlineImage,
    timeDifference,
    date,
    economyPrice,
    businessPrice,
    firstClassPrice,
    price,
    selectedTravelClass,
  
  } = storedFlightData || {};

  const [passengerInfo, setPassengerInfo] = useState({
    _id:"",
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    nationality: "",
    passportNumber: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userEmail");

    if (!userId) {
      alert("Please login to continue");
      history.push("/auth/signin");
    }

    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(userId);

        if (!user) {
          alert("User details not found");
          history.push("/auth/signin");
        }

        setPassengerInfo((prevInfo) => ({
          ...prevInfo,
          _id:user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
//   const [bookingInfo, setBookingInfo] = useState({
//     userid:passengerInfo._id,
//     flightinfo: storedFlightData._keyid,
//     pnr: "",

//   });
  const handleChange = (e) => {
    setPassengerInfo({
      ...passengerInfo,
      [e.target.name]: e.target.value,
    });
  };
  function generateRandomPNR(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const pnr = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    return pnr;
  }
  
  function generateSeatNumber() {
    const rowNumber = Math.floor(Math.random() * 50) + 1; // Random row number between 1 and 50
    const seatLetter = String.fromCharCode(65 + Math.floor(Math.random() * 4)); // Random seat letter (A to D)
  
    return `${rowNumber}${seatLetter}`;
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPayment(true);
    const randomPNR = generateRandomPNR(8);
    const seatNumber = generateSeatNumber();
    console.log(randomPNR);
    const bookingInfo= ({
        userid: passengerInfo._id,
        flightinfo: storedFlightData._keyid,
        pnr: randomPNR,
        travelclass: selectedTravelClass,
        seatnumber: seatNumber,
        price: price,
        age: passengerInfo.age,
        gender: passengerInfo.gender,
        nationality: passengerInfo.nationality,
        passportNumber: passengerInfo.passportNumber,
      });
      console.log(bookingInfo);
    window.sessionStorage.setItem("passengerInfo", JSON.stringify(passengerInfo));
    window.sessionStorage.setItem("bookingInfo",JSON.stringify(bookingInfo));

    // Instead of passing an arrow function, pass a reference to the function
    // history.push({
    //   pathname: "/payment",
    //   state: {
    //     passengerInfo,
    //     flightData: storedFlightData,
    //   },
    // });
   
  };
  const handlePaymentSuccess = async (token) => {
    // Handle the successful payment
    // You can send the token to your server along with other booking information
    // Server-side, use the token to create a charge or save it for later use
    console.log("Payment successful! Token:", token);
  
    // Perform the booking after successful payment
    // This is where you can trigger the booking API or save the booking information
    // const response = await fetch("http://localhost:5000/api/savebooking", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify(bookingInfo),
    // });
  
    // if (response.status === 200) {
    //   const responseEmail = await fetch(`http://localhost:5000/api/sendemail`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify(bookingInfo),
    //   });
  
    //   if (responseEmail.status === 200) {
    //     alert("Email Sent");
    //   }
    // }
  
    // Instead of passing an arrow function, pass a reference to the function
    history.push({
      pathname: "/payment",
      state: {
        passengerInfo,
        flightData: storedFlightData,
      },
    });
  };

    let payment_screen;
    let book_button;
    if(showPayment){
      payment_screen =  <Payment handlePaymentSuccess={handleSubmit} />
    }
    if(!showPayment){
      book_button =  <CSmButton title='Book' onClick={handleSubmit} />
    }
  
  return (
    <div className="booking-page">
      <div className="passenger-info-form-container">
        <h2>Passenger Information</h2>
        <form className="passenger-info-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="pinput" value={passengerInfo.name} readOnly />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="pinput" value={passengerInfo.email} readOnly />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input type="text" className="pinput" value={passengerInfo.phone} readOnly />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              className="pinput"
              value={passengerInfo.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={passengerInfo.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nationality:</label>
            <input type="text" name="nationality" className="pinput" value={passengerInfo.nationality} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Passport Number:</label>
            <input type="text" name="passportNumber" className="pinput" value={passengerInfo.passportNumber} onChange={handleChange} required />
          </div>
       
         {book_button}
        </form>
        {payment_screen}
       
      </div>

      <div className="airline-card">
        <div className="airline-image-container">
          <img
            src={airlineImage?.includes("http")
            ? airlineImage
            : `${BACKEND_BASE_URL}/${airlineImage}`}
            alt="Airline Logo"
            className="airline-image"
          />
        </div>
        <div className="airline-timings">
          <h3>Flight Timings</h3>
          <p>Departure: {departure}</p>
          <p>Departure Time: {departureTime}</p>
          <p>Arrival: {destination}</p>
          <p>Arrival Time: {arrivalTime}</p>
          <p>Duration: {timeDifference}</p>
          <p>Price: ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfoForm;
