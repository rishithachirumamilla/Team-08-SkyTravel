import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CInput from "../../../../components/form/CInput";
import CFWButton from "../../../../components/form/CFWButton";
import CSelect from "../../../../components/form/CSelect";
import useAirline from "../../../../hooks/useAirline";
import { THEME_COLOR } from "../../../../helpers/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "16px 24px",
  outline: "none",
  borderRadius: "1rem",
  position: "relative",
};

const AddRouteModal = ({ open, setOpen, flights, setRoutes }) => {
  const { createRoute } = useAirline();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("Hit...");
    setOpen(false);
  };

  const [form, setForm] = useState({
    _flight: "",
    departureAirport: "",
    departureCity: "",
    departureCountry: "",
    destinationAirport: "",
    destinationCity: "",
    destinationCountry: "",
    economyPricing: 0,
    businessPricing: 0,
    firstClassPricing: 0,
    stops: [],
  });

  const submitHandler = async event => {
    event.preventDefault();

    console.log(form);

    const data = {
      _flight: form._flight,
      departure: {
        airport: form.departureAirport,
        city: form.departureCity,
        country: form.departureCountry,
      },
      destination: {
        airport: form.destinationAirport,
        city: form.destinationCity,
        country: form.destinationCountry,
      },
      stops: form.stops,
      economyPricing: form.economyPricing,
      businessPricing: form.businessPricing,
      firstClassPricing: form.firstClassPricing,
    };

    const response = await createRoute(data);
    if (response) {
      setRoutes(pS => [response.route, ...pS]);
      handleClose();
    }

    console.log(form);
  };

  const changeHandler = (event, index) => {
    const { name, value } = event.target;

    if (name !== "stops") return setForm(pS => ({ ...pS, [name]: value }));
    form.stops[index] = value;
    setForm(pS => ({ ...pS }));
  };

  console.log(form.stops);

  const addStop = () => {
    setForm(pS => ({
      ...pS,
      stops: [...pS.stops, ""],
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
          <h3>Add Route</h3>
          <i
            className='fa-solid fa-x'
            style={{ color: THEME_COLOR, cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </div>
        <form onSubmit={submitHandler} className='modal__box__form'>
          <CSelect
            name='_flight'
            id='_flight'
            options={[{ label: "--Select Flight--", value: "" }, ...flights]}
            onChange={changeHandler}
            required={true}
          />
          <div className='modal__box__form__row'>
            <label>Departure</label>
            <div className='modal__box__form__row__content'>
              <CInput
                placeholder='Airport'
                name='departureAirport'
                id='departureAirport'
                type='text'
                onChange={changeHandler}
                required={true}
              />
              <CInput
                placeholder='City'
                name='departureCity'
                id='departureCity'
                type='text'
                onChange={changeHandler}
                required={true}
              />
              <CInput
                placeholder='Country'
                name='departureCountry'
                id='departureCountry'
                type='text'
                onChange={changeHandler}
                required={true}
              />
            </div>
          </div>
          <div className='modal__box__form__row'>
            <label>Destination</label>
            <div className='modal__box__form__row__content'>
              <CInput
                placeholder='Airport'
                name='destinationAirport'
                id='destinationAirport'
                type='text'
                onChange={changeHandler}
                required={true}
              />
              <CInput
                placeholder='City'
                name='destinationCity'
                id='destinationCity'
                type='text'
                onChange={changeHandler}
                required={true}
              />
              <CInput
                placeholder='Country'
                name='destinationCountry'
                id='destinationCountry'
                type='text'
                onChange={changeHandler}
                required={true}
              />
            </div>
          </div>
          <div className='modal__box__form__row'>
            <label>Seating Pricing</label>
            <div className='modal__box__form__row__content'>
              <CInput
                placeholder='Econ Price'
                name='economyPricing'
                id='economyPricing'
                type='number'
                onChange={changeHandler}
               
              />
              <CInput
                placeholder='Business Price'
                name='businessPricing'
                id='businessPricing'
                type='number'
                onChange={changeHandler}
               
              />
              <CInput
                placeholder='First Class Pricing'
                name='firstClassPricing'
                id='firstClassPricing'
                type='number'
                onChange={changeHandler}
               
              />
            </div>
          </div>
          <div className='modal__box__form__addAble'>
            <div className='modal__box__form__addAble__row'>
              <label>Stops</label>
              <span onClick={addStop}>Add stop</span>
            </div>
            {form.stops.map((st, index) => (
              <CInput
                placeholder={`Stop ${index + 1}`}
                name='stops'
                id={`stop_${index} `}
                type='text'
                onChange={e => changeHandler(e, index)}
                required={true}
                key={index}
              />
            ))}
          </div>

          <CFWButton title='Create Route' />
        </form>
      </Box>
    </Modal>
  );
};

export default AddRouteModal;
