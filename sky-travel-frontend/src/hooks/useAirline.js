import axios from "axios";
import { AIRLINE_USER, BACKEND_BASE_URL } from "../helpers/variables";
const useAirline = () => {
  const user = JSON.parse(localStorage.getItem(AIRLINE_USER));
  const isAirline = user?.userType === "airline";

  console.log(user);

  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${isAirline ? user?.token : null}`,
      },
    };
  };

  // FLights
  const createFlight = async data => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/airline/flight`,
        data,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to create flight!");
    }
  };

  const editFlight = async data => {
    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/airline/flight`,
        data,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to edit flight!");
    }
  };

  const getFlights = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/airline/flight`,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to get flights!");
    }
  };

  const deleteFlight = async _flight => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/airline/flight/${_flight}`,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to delete flight!");
    }
  };

  //   Routes
  const createRoute = async data => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/airline/route`,
        data,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      console.log(err);
      alert("Unable to create route!");
    }
  };

  const editRoute = async data => {
    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/airline/route`,
        data,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      console.log(err.response);
      alert("Unable to edit route!");
    }
  };

  const getRoutes = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/airline/route`,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to get routes!");
    }
  };

  const deleteRoute = async _route => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/airline/route/${_route}`,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to delete route!");
    }
  };

  //   Schedules
  const createSchedule = async data => {
    console.log(data)
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/airline/schedule`,
        data,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      console.log(err);
      alert("Unable to create route!");
    }
  };

  const editSchedule = async data => {
    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/airline/schedule`,
        data,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to edit route!");
    }
  };

  const getSchedules = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/airline/schedule`,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to get routes!");
    }
  };

  const deleteSchedule = async _schedule => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/airline/schedule/${_schedule}`,
        getHeaders()
      );
      return response.data;
    } catch (err) {
      alert("Unable to delete route!");
    }
  };

  return {
    createFlight,
    getFlights,
    deleteFlight,
    editFlight,
    createRoute,
    editRoute,
    getRoutes,
    deleteRoute,
    createSchedule,
    deleteSchedule,
    getSchedules,
    editSchedule,
  };
};

export default useAirline;
