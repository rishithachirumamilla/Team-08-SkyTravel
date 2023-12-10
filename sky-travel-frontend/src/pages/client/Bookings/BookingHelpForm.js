// BookingHelpForm.js

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


const BookingHelpForm = ({ bookingId, onClose }) => {
    const generateSupportTicketNumber = () => {
        // You can implement your own logic to generate a unique ticket number
        // For example, you can use a combination of timestamp and a random number
        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 10000);
        return `TICKET-${timestamp}-${randomSuffix}`;
      };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    pnr:bookingId,
    ticket_ref:generateSupportTicketNumber(),
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings/supportticket/user/saveticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      if (response.status===200) {
        setIsSubmissionSuccess(true);
        setIsSnackbarOpen(true);
  
        // Close the form after submission
        setTimeout(() => {
          onClose();
        }, 6000);
      } else {
        // Handle unsuccessful response here, if needed
      }
      console.log(isSubmissionSuccess )
    } catch (error) {
      // Handle fetch error here, if needed
      console.error("Error submitting form:", error);
    }
  };
  
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <Button component={Link} to="/client/faqs" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
  Go to FAQs
</Button>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2196F3" }}>
        Booking Assistance Form
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Booking ID: {bookingId}
      </Typography>

      <form onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>For immediate help call us at : +1 (518) 608-9384</Typography>
        <Typography>Please fill out the below form and we will reach you out at the earliest!</Typography>
        <TextField
          label="Your Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Your Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        
      {isSubmissionSuccess && (
          <Card sx={{ backgroundColor: "#4CAF50", color: "#fff", mt: 2, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h6">
              Support ticket created successfully! 🎉
              <br></br>
              We will get back to you at the earliest. 
            </Typography>
          </Card>
        )}  
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>

      {/* Snackbar for success message */}
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Form submitted successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default BookingHelpForm;
