import React from "react";

const Logo = () => {
  return (
    <div className='logo'>
      <img src={require("../../assets/plane.png")} alt='' />

      <div className='logo__text'>
        <span>SKY</span>
        <span>Travel</span>
      </div>
    </div>
  );
};

export default Logo;
