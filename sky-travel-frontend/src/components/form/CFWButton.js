import React from "react";

const CFWButton = ({ title, onClick, type, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='cFWButton'
      style={{ ...style }}
    >
      {title}
    </button>
  );
};

export default CFWButton;
