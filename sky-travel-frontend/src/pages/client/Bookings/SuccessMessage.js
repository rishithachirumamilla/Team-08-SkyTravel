// SuccessMessage.js

import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <CheckCircleOutline sx={{ fontSize: 100, color: "#4CAF50" }} />
      <Typography variant="h5" sx={{ color: "#4CAF50", mt: 2 }}>
        Booking cancelled and email confirmation sent
      </Typography>
      <Link to="/flightschedules">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Go Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default SuccessMessage;
