import React, { useEffect, useState } from "react";
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

const EditScheduleModal = ({
  open,
  setOpen,
  setSchedules,
  schedules,
  schedule,
  setSchedule,
  routes,
}) => {
  const handleClose = () => setOpen(false);

  const { editSchedule } = useAirline();

  const [form, setForm] = useState({
    _id: "",
    departureTime: "",
    arrivalTime: "",
    _route: "",
    _flight: "",
  });

  useEffect(() => {
    if (schedule) {
      let tempSchedule = JSON.parse(JSON.stringify(schedule));

      setForm({
        _id: tempSchedule._id,
        departureTime: formatDateForInput(new Date(tempSchedule.departureTime)),
        arrivalTime: formatDateForInput(new Date(tempSchedule.arrivalTime)),
        _route: tempSchedule._route._id,
        _flight: tempSchedule._flight._id,
      });
    }
  }, [schedule]);

  const formatDateForInput = date => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const submitHandler = async event => {
    event.preventDefault();
    
    const response = await editSchedule(form);
    if (response) {
      console.log(response);
      let index = schedules.findIndex(sd => sd._id === form._id);
      schedules[index] = response.schedule;
      setSchedules([...schedules]);
      alert("Schedule updated successfully!");
      console.log(JSON.stringify({ form }))
      const email_response = await fetch("http://localhost:5000/api/user/sendupdatedemailbulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form }),
      });
     
      
    }
    handleClose();
  };

  const changeHandler = event => {
    const { name, value } = event.target;

    if (name === "_route") {
      let route = routes?.find(rt => rt.value === value);
      return setForm(pS => ({
        ...pS,
        _route: value,
        _flight: route?._flight,
      }));
    }

    setForm(pS => ({
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
          <h3>Edit Schedule</h3>
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
            options={[{ label: "--Select Route--", value: "" }, ...routes]}
            onChange={changeHandler}
            required={true}
            value={form._route}
          />
          <CInput
            label='Departure Time'
            placeholder='Departure Time'
            name='departureTime'
            id='departureTime'
            type='datetime-local'
            onChange={changeHandler}
            required={true}
            value={form.departureTime}
          />
          <CInput
            label='Arrival Time'
            placeholder='Arrival Time'
            name='arrivalTime'
            id='arrivalTime'
            type='datetime-local'
            onChange={changeHandler}
            required={true}
            value={form.arrivalTime}
          />

          <CFWButton title='Confirm Edit' />
        </form>
      </Box>
    </Modal>
  );
};

export default EditScheduleModal;
