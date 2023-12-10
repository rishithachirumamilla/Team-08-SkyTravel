import React from "react";
import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className='auth'>
      <div className='auth__nav'>
        <img src={require("../../assets/logo.png")} alt='' />
        <div className='auth__nav__links'>
          <div className='auth__nav__links__link'>Popular Now</div>
          <div className='auth__nav__links__link'>About Us</div>
          <div className='auth__nav__links__link'>
            <img src={require("../../assets/avatar.png")} alt='' />
            <span> Login/Join</span>
          </div>
        </div>
      </div>
      <div className='auth__content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
