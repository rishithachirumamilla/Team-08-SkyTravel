import React from "react";
import { THEME_COLOR } from "../../../../helpers/colors";
import { BACKEND_BASE_URL } from "../../../../helpers/variables";

const ScheduleCard = ({
  departure,
  destination,
  departureTime,
  arrivalTime,
  airlineImage,
  timeDifference,
  date,
  schedule,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className='scheduleCard'>
      <img
        src={
          airlineImage?.includes("http")
            ? airlineImage
            : `${BACKEND_BASE_URL}/${airlineImage}`
        }
        alt=''
        className='scheduleCard--logo'
      />
      <div className='scheduleCard__journey'>
        <div className='scheduleCard__journey__left'>
          <span>{departure}</span>
          <span>{departureTime}</span>
        </div>
        <div className='scheduleCard__journey__path'>
          <span>Duration: {timeDifference}</span>
          <div className='scheduleCard__journey__path--circle'></div>
          <div className='scheduleCard__journey__path--line'></div>
          <div className='scheduleCard__journey__path--circle'></div>
        </div>
        <div className='scheduleCard__journey__left'>
          <span>{destination}</span>
          <span>{arrivalTime}</span>
        </div>
      </div>
      <div className='scheduleCard__date'>{date}</div>
      <div className='scheduleCard__date'>
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
            onClick={() => handleEdit(schedule)}
          ></i>
          <i
            className='fa-solid fa-trash'
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(schedule)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
