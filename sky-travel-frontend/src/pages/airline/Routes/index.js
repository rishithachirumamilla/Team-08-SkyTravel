import React, { useEffect, useState } from "react";
import { THEME_COLOR } from "../../../helpers/colors";
import CSmButton from "../../../components/form/CSmButton";
import CTable from "../../../components/general/CTable";
import useAirline from "../../../hooks/useAirline";
import AddFlightModal from "./components/AddFlightModal";
import AddRouteModal from "./components/AddRouteModal";
import EditFlightModal from "./components/EditFlightModal";
import DeleteConfirmation from "../../../components/general/DeleteConfirmation";
import EditRouteModal from "./components/EditRouteModal";

const Routes = () => {
  const { getFlights, getRoutes, deleteFlight, deleteRoute } = useAirline();

  const [flightDeleteModalOpen, setFlightDeleteModalOpen] = useState(false);
  const [routeDeleteModalOpen, setRouteDeleteModalOpen] = useState(false);
  const [addFlightModalOpen, setAddFlightModalOpen] = useState(false);
  const [editFlightModalOpen, setEditFlightModalOpen] = useState(false);
  const [editRouteModalOpen, setEditRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
  const [addRouteModalOpen, setAddRouteModalOpen] = useState(false);

  const [flightDeleteConfirm, setFlightDeleteConfirm] = useState(false);
  const [routeDeleteConfirm, setRouteDeleteConfirm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [flights, setFlights] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (flightDeleteConfirm && selectedFlight) {
      deleteFlight(selectedFlight._id).then(res => {
        let filteredFlights = flights.filter(
          fl => fl._id !== selectedFlight._id
        );
        let filteredRoutes = routes.filter(
          rt => rt._flight._id !== selectedFlight._id
        );
        setFlights([...filteredFlights]);
        setRoutes([...filteredRoutes]);
      });
    }
  }, [flightDeleteConfirm]);

  useEffect(() => {
    if (routeDeleteConfirm && selectedRoute) {
      deleteRoute(selectedRoute._id).then(res => {
        let filteredRoutes = routes.filter(rt => rt._id !== selectedRoute._id);
        setRoutes([...filteredRoutes]);
      });
    }
  }, [routeDeleteConfirm]);

  const getInitialData = async () => {
    const [flightsRes, routesRes] = await Promise.all([
      getFlights(),
      getRoutes(),
    ]);
    if (flightsRes) setFlights([...flightsRes.flights]);
    if (routesRes) setRoutes([...routesRes.routes]);
    setLoading(false);
  };

  const handleFlightDelete = flight => {
    setSelectedFlight(flight);
    setFlightDeleteModalOpen(true);
  };

  const handleRouteDelete = route => {
    setSelectedRoute(route);
    setRouteDeleteModalOpen(true);
  };

  const handleFlightEdit = flight => {
    setSelectedFlight(flight);
    setEditFlightModalOpen(true);
  };

  const handleRouteEdit = sd => {
    setSelectedRoute(sd);
    setEditRouteModalOpen(true);
  };

  const prepareFlightsData = () => {
    return flights.map(fl => [
      fl?.title,
      fl.flightNumber,
      `${fl.economyCapacity}/
      ${fl.businessCapacity}/
      ${fl.firstClassCapacity}`,
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <i
          className='fa-regular fa-pen-to-square'
          style={{ color: THEME_COLOR, cursor: "pointer" }}
          onClick={() => handleFlightEdit(fl)}
        ></i>
        <i
          className='fa-solid fa-trash'
          style={{ color: "red" }}
          onClick={() => handleFlightDelete(fl)}
        ></i>
      </div>,
    ]);
  };

  console.log(routes);
  const prepareRoutesData = () => {
    return routes.map(rt => [
      rt._flight?.flightNumber,
      `${rt.departure?.airport},${rt.departure?.city},${rt.departure?.country}`,
      `${rt.destination?.airport},${rt.destination?.city},${rt.destination?.country}`,
      rt.stops?.length,
      `${rt.economyPricing}/${rt.businessPricing}/${rt.firstClassPricing}`,
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <i
          className='fa-regular fa-pen-to-square'
          style={{ color: THEME_COLOR, cursor: "pointer" }}
          onClick={() => handleRouteEdit(rt)}
        ></i>
        <i
          className='fa-solid fa-trash'
          style={{ color: "red" }}
          onClick={() => handleRouteDelete(rt)}
        ></i>
      </div>,
    ]);
  };

  return (
    <div className='routes'>
      {loading ? (
        <div className='routes__loading'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='routes__row'>
          <div className='routes__row__flights'>
            <div className='routes__nav'>
              <h4>Flights</h4>
              <CSmButton
                title='Add Flight'
                onClick={() => setAddFlightModalOpen(true)}
              />
            </div>
            <CTable
              headings={[
                "Title",
                "Flight Number",
                "Econ/Business/1st Cl Capacity",
                "Actions",
              ]}
              rows={[...prepareFlightsData()]}
            />
          </div>
          <div className='routes__row__routes'>
            <div className='routes__nav'>
              <h4>Routes</h4>
              <CSmButton
                title='Add Route'
                onClick={() => setAddRouteModalOpen(true)}
              />
            </div>
            <CTable
              headings={[
                "Flight Number",
                "Departure",
                "Destination",
                "Stops",
                "Econ/Business/1st Cl Pricing",
                "Actions",
              ]}
              rows={[...prepareRoutesData()]}
            />
          </div>
        </div>
      )}
      <AddFlightModal
        open={addFlightModalOpen}
        setOpen={setAddFlightModalOpen}
        setFlights={setFlights}
      />
      <EditFlightModal
        open={editFlightModalOpen}
        setOpen={setEditFlightModalOpen}
        flight={selectedFlight}
        setFlight={setSelectedFlight}
        flights={flights}
        setFlights={setFlights}
      />

      <EditRouteModal
        open={editRouteModalOpen}
        setOpen={setEditRouteModalOpen}
        route={selectedRoute}
        setRoute={setSelectedRoute}
        routes={routes}
        setRoutes={setRoutes}
        flights={flights.map(fl => ({ value: fl._id, label: fl.title }))}
      />

      <AddRouteModal
        open={addRouteModalOpen}
        setOpen={setAddRouteModalOpen}
        flights={flights.map(fl => ({ value: fl._id, label: fl.title }))}
        setRoutes={setRoutes}
      />
      <DeleteConfirmation
        open={flightDeleteModalOpen}
        setOpen={setFlightDeleteModalOpen}
        title={selectedFlight?.title}
        setConfirm={setFlightDeleteConfirm}
      />
      <DeleteConfirmation
        open={routeDeleteModalOpen}
        setOpen={setRouteDeleteModalOpen}
        title={`${selectedRoute?.departure?.city} - ${selectedRoute?.destination?.city}`}
        setConfirm={setRouteDeleteConfirm}
      />
    </div>
  );
};

export default Routes;
