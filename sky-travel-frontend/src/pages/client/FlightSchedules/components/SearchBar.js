import React, { useState, useEffect } from "react";
import useGeneral from "../../../../hooks/useGeneral";

const SearchBar = ({ setSchedules }) => {
  const [query, setQuery] = useState({
    from: "",
    to: "",
    date: "",
  });

  const [routes, setRoutes] = useState([]);
  const { getFilteredSchedules } = useGeneral();

  useEffect(() => {
    const fetchRoutesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/routes"); // Replace with your API endpoint
        const data = await response.json();
        console.log(data);
        setRoutes(data);
      } catch (error) {
        console.error("Error fetching routes data:", error);
      }
    };

    fetchRoutesData();
  }, []);

  const renderDatalist = (key) => (
    <datalist id={`${key}List`}>
      {routes.map((route) => (
        <option key={route._id} value={route[key].city}>
          {route[key].city} ({route[key].airport})
        </option>
      ))}
    </datalist>
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "travelClass") {
      // Save travel class to sessionStorage
      sessionStorage.setItem("travelClass", value);
    }
    // Check if the input value matches any city or airport in the routes data
    const matchedRoute = routes.find(
      (route) =>
        route.departure.city.toLowerCase() === value.toLowerCase() ||
        route.departure.airport.toLowerCase() === value.toLowerCase() ||
        route.destination.city.toLowerCase() === value.toLowerCase() ||
        route.destination.airport.toLowerCase() === value.toLowerCase()
    );

    if (matchedRoute) {
      if (name === "from") {
        setQuery((pS) => ({
          ...pS,
          from: matchedRoute.departure.city, // or use matchedRoute.departure.airport if you want the airport
        }));
      } else if (name === "to") {
        setQuery((pS) => ({
          ...pS,
          to: matchedRoute.destination.city, // or use matchedRoute.destination.airport if you want the airport
        }));
      }
    } else {
      setQuery((pS) => ({
        ...pS,
        [name]: value,
      }));
    }
  };
  const searchNow = async () => {
    const response = await getFilteredSchedules(query);
    if (response) {
      console.log(response.schedules);
      setSchedules([...response.schedules]);
    }
  };

  return (
    <div className='flightSchedules__search'>
      <div className='flightSchedules__search__input'>
        <label htmlFor='from'>Departure</label>
        <input
          type='text'
          id='from'
          name='from'
          list='fromList'
          placeholder='City'
          onChange={changeHandler}
          required={true}
        />
        <datalist id='fromList'>
          {routes.map((route) => (
            <option key={route._id} value={route.departure.city} />
          ))}
        </datalist>
      </div>
      <div className='flightSchedules__search__input'>
        <label htmlFor='to'>Destination</label>
        <input
          type='text'
          id='to'
          name='to'
          list='toList'
          placeholder='City'
          onChange={changeHandler}
          required={true}
        />
        <datalist id='toList'>
          {routes.map((route) => (
            <option key={route._id} value={route.destination.city} />
          ))}
        </datalist>
      </div>
      <div className='flightSchedules__search__input'>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          id='date'
          name='date'
          placeholder='2024'
          onChange={changeHandler}
          required={true}
        />
      </div>
      <div className="flightSchedules__search__input">
        <label htmlFor="travelClass">Travel Class</label>
        <select
          id="travelClass"
          name="travelClass"
          onChange={changeHandler}
          defaultValue={query.travelClass}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First class">First class</option>
        </select>
      </div>

      <div className='flightSchedules__search__btn' onClick={searchNow}>
        <i className='fa-solid fa-magnifying-glass'></i>
        Search
      </div>
    </div>
  );
};

export default SearchBar;
