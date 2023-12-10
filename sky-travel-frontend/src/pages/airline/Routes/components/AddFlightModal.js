import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { THEME_COLOR } from "../../../../helpers/colors";
import CInput from "../../../../components/form/CInput";
import CFWButton from "../../../../components/form/CFWButton";
import useAirline from "../../../../hooks/useAirline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "16px 24px",
  outline: "none",
  borderRadius: "1rem",
  position: "relative",
};

const checkboxLabelStyle = {
  fontSize: "0.8rem", // Adjust the font size to make it smaller
  color: "#555", // Optionally, you can change the color
  fontWeight: "normal", // Optionally, you can change the font weight
  marginBottom: "5px", // Add some spacing at the bottom
};

const AddFlightModal = ({ open, setOpen, setFlights }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { createFlight } = useAirline();

  const [flight, setFlight] = useState({
    title: "",
    flightNumber: "",
    economyCapacity: 0,
    showEconomyCapacity: false,
    businessCapacity: 0,
    showBusinessCapacity: false,
    firstClassCapacity: 0,
    showFirstClassCapacity: false,
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await createFlight(flight);
    if (response) {
      setFlights((prevFlights) => [response.airline, ...prevFlights]);
    }

    handleClose();
  };

  const changeHandler = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === "checkbox") {
      setFlight((prevFlight) => ({
        ...prevFlight,
        [name]: checked,
        [`${name.replace("show", "").toLowerCase()}Capacity`]: checked ? 0 : 0,
      }));
    } else {
      setFlight((prevFlight) => ({
        ...prevFlight,
        [name]: value,
      }));
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal__box">
        <div className="modal__box__nav">
          <h3>Add Flight</h3>
          <i
            className="fa-solid fa-x"
            style={{ color: THEME_COLOR, cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </div>
        <form onSubmit={submitHandler} className="modal__box__form">
          <CInput
            placeholder="Flight Title"
            name="title"
            id="title"
            type="text"
            onChange={changeHandler}
            required={true}
          />
          <CInput
            placeholder="Flight Number"
            name="flightNumber"
            id="flightNumber"
            type="text"
            onChange={changeHandler}
            required={true}
          />
          <div>
            <label style={checkboxLabelStyle}>
              Economy
              <input
                type="checkbox"
                checked={flight.showEconomyCapacity}
                onChange={changeHandler}
                name="showEconomyCapacity"
              />
            </label>
          </div>
          {flight.showEconomyCapacity && (
            <CInput
              placeholder="Economy Capacity"
              name="economyCapacity"
              id="economyCapacity"
              type="number"
              onChange={changeHandler}
              required={true}
            />
          )}
          <div>
            <label style={checkboxLabelStyle}>
              Business
              <input
                type="checkbox"
                checked={flight.showBusinessCapacity}
                onChange={changeHandler}
                name="showBusinessCapacity"
              />
            </label>
          </div>
          {flight.showBusinessCapacity && (
            <CInput
              placeholder="Business Capacity"
              name="businessCapacity"
              id="businessCapacity"
              type="number"
              onChange={changeHandler}
              required={true}
            />
          )}
          <div>
            <label style={checkboxLabelStyle}>
              First Class
              <input
                type="checkbox"
                checked={flight.showFirstClassCapacity}
                onChange={changeHandler}
                name="showFirstClassCapacity"
              />
            </label>
          </div>
          {flight.showFirstClassCapacity && (
            <CInput
              placeholder="First Class Capacity"
              name="firstClassCapacity"
              id="firstClassCapacity"
              type="number"
              onChange={changeHandler}
              required={true}
            />
          )}
          <CFWButton title="Create Flight" />
        </form>
      </Box>
    </Modal>
  );
};

export default AddFlightModal;
