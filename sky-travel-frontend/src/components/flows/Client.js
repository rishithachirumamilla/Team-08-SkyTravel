import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import { AIRLINE_USER, BACKEND_BASE_URL } from "../../helpers/variables";

const Client = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(AIRLINE_USER));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const handleBookings = () =>{
  window.location = "./mybookings";
}
const handleProfile = () =>{
  window.location = "client/profile";
}
  const logout = () => {
    localStorage.removeItem(AIRLINE_USER);
    localStorage.removeItem("userEmail");
    sessionStorage.clear();
    localStorage.clear();
    window.location = './auth/signin'
    handleClose();
  };

  const navigateToLogin = () => navigate("/auth/signin");

  return (
    <div className='auth'>
      <div className='auth__nav'>
        <img src={require("../../assets/logo.png")} alt='' />
        <div className='auth__nav__links'>
        
          {user?.userType === "user" ? (
            <div
              className='auth__nav__links__link'
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  user.user?.image.includes("http")
                    ? user.user?.image
                    : `${BACKEND_BASE_URL}/${user.user?.image}`
                }
                alt=''
              />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {user.user?.name}
                <i className='fa-solid fa-chevron-down'></i>
              </span>
            </div>
          ) : (
            <div
              className='auth__nav__links__link'
              onClick={navigateToLogin}
              style={{ cursor: "pointer" }}
            >
              <img src={require("../../assets/avatar.png")} alt='' />
              <span> Login/Join</span>
            </div>
          )}
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}  
          >
            <MenuItem onClick = {handleProfile}>My Profile</MenuItem>
            <MenuItem onClick = {handleBookings}>My Bookings</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div className='auth__content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Client;
