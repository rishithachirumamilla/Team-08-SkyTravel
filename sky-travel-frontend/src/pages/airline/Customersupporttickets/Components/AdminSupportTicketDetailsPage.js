// AdminSupportTicketDetailsPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText, TextField, Button,Grid } from "@mui/material";

const AdminSupportTicketDetailsPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    // Fetch the details of the specific support ticket from the backend
    const fetchSupportTicketDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/support-tickets/${ticketId}`);
        const data = await response.json();
        
        setTicket([data.ticket]);    
        console.log(data)
      } catch (error) {
        console.error("Error fetching support ticket details:", error);
      }
    };

    fetchSupportTicketDetails();
  }, [ticketId]);

  const handleReplySubmit = async () => {
    // Submit the reply to the backend
    try {
      const response = await fetch(`http://localhost:5000/api/support-tickets/${ticketId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply }),
      });
      const data = await response.json();
      alert("Reply sent successfully")
      try {
        const response = await fetch(`http://localhost:5000/api/support-tickets/${ticketId}`);
        const data = await response.json();
        
        setTicket([data.ticket]);    
        console.log(data)
      } catch (error) {
        console.error("Error fetching support ticket details:", error);
      }
      //setTicket(data);
      setReply(""); // Clear the reply input after submission
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  useEffect(() => {
    // Log the updated ticket state
    console.log(ticket);
  }, [ticket]); 
  if (!ticket) {
    return <div>Loading...</div>;
  }
//   if (!ticket || !ticket.replies || ticket.replies.length === 0) {
//     return <div>No replies found.</div>;
//   }
  

  return (
    <div>
      <Typography variant="h4">Support Ticket Details</Typography>
     
      <List>
  {ticket.map((reply, index) => (
    <ListItem key={index}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Ticket ID: {reply.ticket_ref}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Date: {new Date().toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Customer: {reply.message}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Admin: {reply.reply}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  ))}
</List>
      <TextField
        label="Reply"
        multiline
        fullWidth
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        variant="outlined"
        sx={{ mt: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleReplySubmit} sx={{ mt: 2 }}>
        Reply
      </Button>
    </div>
  );
};

export default AdminSupportTicketDetailsPage;
