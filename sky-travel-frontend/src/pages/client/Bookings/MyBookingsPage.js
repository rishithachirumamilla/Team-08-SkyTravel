// MyBookingsPage.js

import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard"; // Create a BookingCard component to display each booking
//import { useAuth } from "../../context/AuthContext"; // Import the authentication context if available

const MyBookingsPage = () => {
  const  currentUser  =  localStorage.getItem("userEmail");; // Assuming you have a context for authentication
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
   
    // Fetch bookings when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/user/${currentUser}`);
        const data = await response.json();
        setBookingsData(data);
        console.log(data)
        debugger
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>
      <div className="booking-cards">
        {bookingsData.map((booking) => (
          <BookingCard key={booking.booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
