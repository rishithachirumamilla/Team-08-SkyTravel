import { Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ image, name, rating, review }) => {
  return (
    <div className='reviewCard'>
      <div className='reviewCard__top'>
        <div className='reviewCard__top__image'>
          <img src={image} alt='' />
        </div>
        <div className='reviewCard__top__dets'>
          <h3>{name}</h3>
          <Rating
            name='size-small'
            defaultValue={rating}
            readOnly
            size='small'
          />
        </div>
      </div>
      <div className='reviewCard__bottom'>{review}</div>
    </div>
  );
};

export default ReviewCard;
