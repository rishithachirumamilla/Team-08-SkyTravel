import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CInput from "../../../../components/form/CInput";
import CSelect from "../../../../components/form/CSelect";
import CFWButton from "../../../../components/form/CFWButton";
import useAirline from "../../../../hooks/useAirline";
import { THEME_COLOR } from "../../../../helpers/colors";

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

const AddScheduleModal = ({ open, setOpen, setSchedules, routes }) => {
  const handleClose = () => setOpen(false);

  const { createSchedule } = useAirline();

  const [schedule, setSchedule] = useState({
    departureTime: "",
    arrivalTime: "",
    _route: "",
    _flight: "",
  });

  const submitHandler = async event => {
    event.preventDefault();

    const response = await createSchedule(schedule);
    if (response) {
      setSchedules(pS => [response.schedule, ...pS]);
    }
    handleClose();
  };

  const changeHandler = async event => {
    const { name, value } = event.target;
    console.log("name",name)
    console.log("value",value)  
    if (name === "_route") {
      let route = await routes?.find(rt => rt && rt.value && rt.value.toString() === value?.toString());

      console.log(routes)
      console.log("route",route)
      return setSchedule(pS => ({
        ...pS,
        _route: value,
        _flight: route?._flight,
      }));
    }

    setSchedule(pS => ({
      ...pS,
      [name]: value,
    }));
  };

  


  console.log("I got routes",...routes);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} className='modal__box'>
        <div className='modal__box__nav'>
          <h3>Add Schedule</h3>
          <i
            className='fa-solid fa-x'
            style={{ color: THEME_COLOR, cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </div>
        <form onSubmit={submitHandler} className='modal__box__form'>
          <CSelect
            label='Route'
            name='_route'
            id='_route'
            options={[
              { label: "--Select Route--", value: "" },...routes]}
            onChange={changeHandler}
            required={true}
          />
          <CInput
            label='Departure Time'
            placeholder='Departure Time'
            name='departureTime'
            id='departureTime'
            type='datetime-local'
            onChange={changeHandler}
            required={true}
          />
          <CInput
            label='Arrival Time'
            placeholder='Arrival Time'
            name='arrivalTime'
            id='arrivalTime'
            type='datetime-local'
            onChange={changeHandler}
            required={true}
          />

          <CFWButton title='Create Schedule' />
        </form>
      </Box>
    </Modal>
  );
};

export default AddScheduleModal;
