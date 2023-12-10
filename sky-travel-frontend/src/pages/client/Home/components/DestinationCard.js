import React from "react";

const DestinationCard = ({ image, destination, price }) => {
  return (
    <div className='destCard'>
      <div className='destCard__image'>
        <img src={image} alt='' />
      </div>
      <div className='destCard__dets'>
        <h4>{destination}</h4>
        <div className='destCard__dets__pricing'>
          <h5>
            From:<span> {price}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
