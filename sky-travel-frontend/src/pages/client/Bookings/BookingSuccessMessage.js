import React, { useState, useEffect } from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BookingSuccessMessage = () => {
  let active = true;
  useEffect(() => {
    const abortController = new AbortController();

    console.log("BookingSuccessMessage component mounted");

    const fetchData = async () => {
      try {
        console.log("Fetching data...");

        const bookingInfoString = sessionStorage.getItem("bookingInfo");
        console.log("Booking Info String:", bookingInfoString);

        if (!bookingInfoString) {
          console.log("Booking Info not found in sessionStorage");
          return;
        }

        const bookingInfo = JSON.parse(bookingInfoString);
        if(active){
        const response = await fetch("http://localhost:5000/api/savebooking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bookingInfo),
          signal: abortController.signal,
        });

        console.log("Save Booking API Response:", response);

        if (response.status === 200) {
          const responseEmail = await fetch(
            "http://localhost:5000/api/sendemail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(bookingInfo),
              signal: abortController.signal,
            }
          );

          console.log("Send Email API Response:", responseEmail);
            
          if (responseEmail.status === 200) {
            //alert("Email Sent");
          }

          sessionStorage.removeItem("bookingInfo");
        }
      }
      } catch (error) {
        console.error("Error processing booking:", error);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []); // Empty dependency array for componentDidMount-like behavior

  console.log("BookingSuccessMessage component rendering");

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <CheckCircleOutline sx={{ fontSize: 100, color: "#4CAF50" }} />
      <Typography variant="h5" sx={{ color: "#4CAF50", mt: 2 }}>
        Booking Successful, and email confirmation sent
      </Typography>
      <Link to="/flightschedules">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Go Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default BookingSuccessMessage;
