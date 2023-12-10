import React, { useEffect, useState } from "react";
import moment from "moment";
import CSmButton from "../../../components/form/CSmButton";
import useAirline from "../../../hooks/useAirline";
import AddScheduleModal from "./components/AddScheduleModal";
import ScheduleCard from "./components/ScheduleCard";
import { calcTimeDiff } from "../../../helpers/funcs";
import DeleteConfirmation from "../../../components/general/DeleteConfirmation";
import EditScheduleModal from "./components/EditScheduleModal";
import axios from 'axios';
const Schedules = () => {
  const [addScheduleModalOpen, setAddScheduleModalOpen] = useState(false);
  const [editScheduleModalOpen, setEditScheduleModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [scheduleDeleteModalOpen, setScheduleDeleteModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [deletionConfirm, setDeletionConfirm] = useState(false);

  const { getSchedules, getRoutes, deleteSchedule } = useAirline();

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (deletionConfirm && selectedSchedule) {
      deleteSchedule(selectedSchedule._id).then(res => {
        console.log(res);
        let filteredSchedules = schedules.filter(
          sd => sd._id !== selectedSchedule._id
        );
        setSchedules([...filteredSchedules]);
      });
    }
  }, [deletionConfirm]);

  const handleEdit = sd => {
    setSelectedSchedule(sd);
    setEditScheduleModalOpen(true);
  };

  const getInitialData = async () => {
    const [schedulesRes, routesRes] = await Promise.all([
      getSchedules(),
      getRoutes(),
    ]);
    if (schedulesRes) setSchedules([...schedulesRes.schedules]);
    if (routesRes) {
      console.log(routesRes);
    
      setRoutes(
        await Promise.all(
          routesRes.routes.map(async (rt) => {
            // Use axios to get flight name
            const flightNameResponse = await axios.get(`http://localhost:5000/api/getflightname/${rt._flight?._id}`);
            const flightName = flightNameResponse.data;
            console.log(`${rt?.departure?.city} - ${rt?.destination?.city} - ${flightName}`)
            return {
              value: rt._id,
              label: `${rt?.departure?.city} - ${rt?.destination?.city} - ${flightName}`,
              _flight: rt._flight?._id,
            };
          })
        )
      );
      
    }
    setLoading(false);
  };

  const handleDelete = sd => {
    setSelectedSchedule(sd);
    setScheduleDeleteModalOpen(true);
  };

  console.log(schedules);

  return (
    <div className='schedules'>
      {loading ? (
        <div className='routes__loading'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className='schedules__nav'>
            <CSmButton
              title='Add Schedule'
              onClick={() => setAddScheduleModalOpen(true)}
            />
          </div>

          <div className='schedules__content'>
            {schedules?.map(sd => (
              <ScheduleCard
                key={sd?._id}
                schedule={sd}
                airlineImage={sd?._airline?.image}
                departure={`${sd?._route?.departure?.city}, ${sd?._route?.departure?.country}`}
                destination={`${sd?._route?.destination?.city}, ${sd?._route?.destination?.country}`}
                date={moment(sd?.departureTime).format("MMMM Do YYYY")}
                departureTime={moment(sd?.departureTime).format("h:mm a")}
                arrivalTime={moment(sd?.arrivalTime).format("h:mm a")}
                timeDifference={calcTimeDiff(
                  sd?.arrivalTime,
                  sd?.departureTime
                )}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </>
      )}

      <AddScheduleModal
        open={addScheduleModalOpen}
        setOpen={setAddScheduleModalOpen}
        setSchedules={setSchedules}
        routes={routes}
      />
      <EditScheduleModal
        open={editScheduleModalOpen}
        setOpen={setEditScheduleModalOpen}
        setSchedules={setSchedules}
        schedules={schedules}
        schedule={selectedSchedule}
        setSchedule={setSelectedSchedule}
        routes={routes}
      />
      <DeleteConfirmation
        open={scheduleDeleteModalOpen}
        setOpen={setScheduleDeleteModalOpen}
        title={`${selectedSchedule?._route?.departure?.city} - ${selectedSchedule?._route?.destination?.city}`}
        setConfirm={setDeletionConfirm}
      />
    </div>
  );
};

export default Schedules;
