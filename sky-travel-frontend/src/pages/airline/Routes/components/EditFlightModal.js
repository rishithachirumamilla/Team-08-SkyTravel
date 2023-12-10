import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CInputWithIcon from "../../../../components/form/CInputWithIcon";
import CInput from "../../../../components/form/CInput";
import CFWButton from "../../../../components/form/CFWButton";
import { THEME_COLOR } from "../../../../helpers/colors";
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

const EditFlightModal = ({
  open,
  setOpen,
  flight,
  setFlight,
  setFlights,
  flights,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { editFlight } = useAirline();

  const submitHandler = async event => {
    event.preventDefault();

    const response = await editFlight(flight);
    if (response) {
      let index = flights.findIndex(fl => fl._id === response.flight._id);
      flights[index] = response.flight;
      setFlights([...flights]);
      setFlight();
      alert("Flight updated successfully!");
      handleClose();
    }
  };

  const changeHandler = event => {
    const { name, value } = event.target;
    setFlight(pS => ({
      ...pS,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} className='modal__box'>
        <div className='modal__box__nav'>
          <h3>Edit Flight</h3>
          <i
            className='fa-solid fa-x'
            style={{ color: THEME_COLOR, cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </div>
        <form onSubmit={submitHandler} className='modal__box__form'>
          <CInput
            placeholder='Flight Title'
            name='title'
            id='title'
            type='text'
            onChange={changeHandler}
            required={true}
            value={flight?.title}
          />
          <CInput
            placeholder='Flight Number'
            name='flightNumber'
            id='flightNumber'
            type='text'
            onChange={changeHandler}
            required={true}
            value={flight?.flightNumber}
          />
          <CInput
            placeholder='Econ Capacity'
            name='economyCapacity'
            id='economyCapacity'
            type='number'
            onChange={changeHandler}
           
            value={flight?.economyCapacity}
          />
          <CInput
            placeholder='Business Capacity'
            name='businessCapacity'
            id='businessCapacity'
            type='number'
            onChange={changeHandler}
           
            value={flight?.businessCapacity}
          />
          <CInput
            placeholder='First Class Capacity'
            name='firstClassCapacity'
            id='firstClassCapacity'
            type='number'
            onChange={changeHandler}
           
            value={flight?.firstClassCapacity}
          />
          <CFWButton title='Confirm Edit' />
        </form>
      </Box>
    </Modal>
  );
};

export default EditFlightModal;
