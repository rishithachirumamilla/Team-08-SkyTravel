import React from "react";
import CSmButton from "../../../../components/form/CSmButton";
import { BACKEND_BASE_URL } from "../../../../helpers/variables";
import { Link } from "react-router-dom";
const ScheduleCard = ({
  _keyid,
  departure,
  destination,
  departureTime,
  arrivalTime,
  airlineImage,
  timeDifference,
  date,
  economyPrice,
  businessPrice,
  firstClassPrice,
  economyAvailable,
  businessAvailable,
  firstClassAvailable,
 
}) => {
  const selectedTravelClass = sessionStorage.getItem("travelClass") || "Economy";
  
  // Display the corresponding price based on the selected travel class
  let price;
  let seats_available;
  console.log("ecocnomy", economyAvailable)
  switch (selectedTravelClass) {
    case "Economy":
      price = economyPrice;
      seats_available = economyAvailable;
      break;
    case "Business":
      price = businessPrice;
      seats_available = businessAvailable;
      break;
    case "First class":
      price = firstClassPrice;
      seats_available = firstClassAvailable;
      break;
    default:
      price = economyPrice;
      seats_available = 0; // Default to Economy if the selected class is not recognized
  }
  const handleBookClick = () => {
    // Handle any additional logic before navigating, if needed
    // For example, you might want to fetch additional data or perform validation
    console.log(_keyid)
    const state =  {
      _keyid,
      departure,
      destination,
      departureTime,
      arrivalTime,
      airlineImage,
      timeDifference,
      date,
      economyPrice,
      businessPrice,
      firstClassPrice,
      price,
      selectedTravelClass,
    }
    window.localStorage.setItem("selectedFlight",JSON.stringify(state))
    debugger;
  };
  if(!seats_available){
    return ;
  }
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
        <div className='scheduleCard__journey__right'>
          <span>{destination}</span>
          <span>{arrivalTime}</span>
        </div>
      </div>
      <div className='scheduleCard__date'>{date}</div>
      <div className="scheduleCard__price">
        <span className="scheduleCard__price-label"></span>
        <span className="scheduleCard__price-value">${price}</span>
      </div>
      <div className="scheduleCard__price">
        
        <span className="scheduleCard__seats-value">{seats_available}</span>
        <span className="scheduleCard__price-label"></span>
        <span className="scheduleCard__price-label"> seats left</span>
      </div>
      <div className='scheduleCard__btn'>
        {/* Use Link to navigate to the PassengerInfoForm component */}
        <Link
  to={{
    pathname: "/passenger-info",
    state: {_keyid,
      departure,
      destination,
      departureTime,
      arrivalTime,
      airlineImage,
      timeDifference,
      date,
      economyPrice,
      businessPrice,
      firstClassPrice,
    },
  }}
  onClick={handleBookClick}
>
  <CSmButton title='Book' />
</Link>

      </div>
    </div>
  );
};

export default ScheduleCard;
