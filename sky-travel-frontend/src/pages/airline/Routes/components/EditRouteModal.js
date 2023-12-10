import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CInput from "../../../../components/form/CInput";
import CFWButton from "../../../../components/form/CFWButton";
import CSelect from "../../../../components/form/CSelect";
import { THEME_COLOR } from "../../../../helpers/colors";
import useAirline from "../../../../hooks/useAirline";

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

const EditRouteModal = ({
  open,
  setOpen,
  route,
  setRoute,
  routes,
  setRoutes,
  flights,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { editRoute } = useAirline();

  const [form, setForm] = useState({
    _id: "",
    _flight: "",
    departureAirport: "",
    departureCity: "",
    departureCountry: "",
    destinationAirport: "",
    destinationCity: "",
    destinationCountry: "",
    stops: [],
  });

  useEffect(() => {
    if (route) {
      let tempRoute = JSON.parse(JSON.stringify(route));

      setForm({
        _id: tempRoute._id,
        _flight: tempRoute?._flight?._id,
        departureAirport: tempRoute?.departure?.airport,
        departureCity: tempRoute?.departure?.city,
        departureCountry: tempRoute?.departure?.country,
        destinationAirport: tempRoute?.destination?.airport,
        destinationCity: tempRoute?.destination?.city,
        destinationCountry: tempRoute?.destination?.country,
        firstClassPricing: tempRoute?.firstClassPricing,
        businessPricing: tempRoute?.businessPricing,
        economyPricing: tempRoute?.economyPricing,
        stops: [...tempRoute.stops],
      });
    }
  }, [route]);

  const submitHandler = async event => {
    event.preventDefault();

    console.log(form);

    const data = {
      _id: form._id,
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

    const response = await editRoute(data);
    if (response) {
      console.log(response);

      const index = routes.findIndex(rt => rt._id === form._id);
      routes[index] = response.route;
      setRoutes([...routes]);

      alert("Route updated successfully!");
      setRoute();
      handleClose();

      // setRoutes(pS => [response.route, ...pS]);
      // handleClose();
    }
  };

  const changeHandler = (event, index) => {
    const { name, value } = event.target;

    if (name !== "stops") return setForm(pS => ({ ...pS, [name]: value }));

    console.log(name, value);

    form.stops[index] = value;
    setForm(pS => ({ ...pS }));
  };

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
          <h3>Edit Route</h3>
          <i
            className='fa-solid fa-x'
            style={{ color: THEME_COLOR, cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </div>{" "}
        <form onSubmit={submitHandler} className='modal__box__form'>
          <CSelect
            name='_flight'
            id='_flight'
            options={[{ label: "--Select Flight--", value: "" }, ...flights]}
            onChange={changeHandler}
            required={true}
            value={form?._flight}
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
                value={form?.departureAirport}
              />
              <CInput
                placeholder='City'
                name='departureCity'
                id='departureCity'
                type='text'
                onChange={changeHandler}
                required={true}
                value={form?.departureCity}
              />
              <CInput
                placeholder='Country'
                name='departureCountry'
                id='departureCountry'
                type='text'
                onChange={changeHandler}
                required={true}
                value={form?.departureCountry}
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
                value={form?.destinationAirport}
              />
              <CInput
                placeholder='City'
                name='destinationCity'
                id='destinationCity'
                type='text'
                onChange={changeHandler}
                required={true}
                value={form?.destinationCity}
              />
              <CInput
                placeholder='Country'
                name='destinationCountry'
                id='destinationCountry'
                type='text'
                onChange={changeHandler}
                required={true}
                value={form?.destinationCountry}
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
                required={true}
                value={form?.economyPricing}
              />
              <CInput
                placeholder='Business Price'
                name='businessPricing'
                id='businessPricing'
                type='number'
                onChange={changeHandler}
                required={true}
                value={form?.businessPricing}
              />
              <CInput
                placeholder='First Class Pricing'
                name='firstClassPricing'
                id='firstClassPricing'
                type='number'
                onChange={changeHandler}
                required={true}
                value={form?.firstClassPricing}
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
                value={st}
              />
            ))}
          </div>

          <CFWButton title='Confirm Edit' />
        </form>
      </Box>
    </Modal>
  );
};

export default EditRouteModal;
