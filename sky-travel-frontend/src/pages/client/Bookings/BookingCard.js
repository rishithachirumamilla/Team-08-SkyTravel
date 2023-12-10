// BookingCard.js

import React, { useState } from "react";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import axios from 'axios';
import SuccessMessage from "./SuccessMessage";
import BookingHelpForm from "./BookingHelpForm";
const BookingCard = ({ booking }) => {
  const { booking: bookingInfo, user, route, schedule, flight } = booking;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCancellationSuccess, setIsCancellationSuccess] = useState(false);    
  const [isHelpFormOpen, setIsHelpFormOpen] = useState(false);
  const formatLocalTime = (utcTime) => {
    const localTime = new Date(utcTime).toLocaleString();
    return localTime;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCancelDialog = () => {
    setIsCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setIsCancelDialogOpen(false);
  };

  const handleModify = () => {
  
    console.log("Modify option selected");
    closeModal();
  };

  const handleCancel = () => {
   
    openCancelDialog();
  };
  const openHelpForm = () => {
    setIsHelpFormOpen(true);
    closeModal(); 
  };

  const closeHelpForm = () => {
    setIsHelpFormOpen(false);
  };
  
  const confirmCancel = () => {
  
    try{
    const response = axios.post(`http://localhost:5000/api/bookings/cancel/user/${bookingInfo._id}`)
    setIsCancellationSuccess(true);
    
        console.log("Email confirmation sent");
        console.log("Booking canceled");    
        closeCancelDialog();
        closeModal(); // Close the main modal after canceling the booking
        setIsCancellationSuccess(true);
        window.location = '/client/bookings/cancel/success';
    

    }
    catch(error)
    {
        console.log("error cancelling booking", error);
    }
  };

  const handleHelp = () => {
    
    openHelpForm();
  };

  return (<>
    <Card variant="outlined" sx={{ margin: 2, padding: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2196F3" }}>
        Booking: {bookingInfo.pnr}
      </Typography>
      <Typography sx={{ color: "#4CAF50" }}>User: {user.name} ({user.email})</Typography>
      <Typography>Flight: {flight.title} ({flight.flightNumber})</Typography>
      <Typography>Route: {route.departure.city} to {route.destination.city}</Typography>
      <Typography>
        Schedule: {formatLocalTime(schedule.departureTime)} to {formatLocalTime(schedule.arrivalTime)}
      </Typography>
      <Button variant="contained" color="primary" onClick={openModal} sx={{ mt: 2 }}>
        View Options
      </Button>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle sx={{ color: "#FF5722" }}>Booking Options</DialogTitle>
        <DialogContent>
          {/* <Button variant="contained" color="info" onClick={handleModify} sx={{ mr: 2 }}>
            Modify
          </Button> */}
          <Button variant="contained" color="error" onClick={handleCancel} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleHelp} sx={{ color: "#27B049" }}>
            Help
          </Button>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onClose={closeCancelDialog}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this booking?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCancelDialog}>No</Button>
          <Button onClick={confirmCancel} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    <Dialog open={isHelpFormOpen} onClose={closeHelpForm} maxWidth="md">
        <DialogTitle sx={{ color: "#FF5722" }}>Booking Assistance Form</DialogTitle>
        <DialogContent>
          <BookingHelpForm bookingId={bookingInfo.pnr} onClose={closeHelpForm} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingCard;
