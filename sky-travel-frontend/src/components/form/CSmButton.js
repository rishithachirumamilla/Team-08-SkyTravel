import React from "react";

const CSmButton = ({ title, onClick, type, icon }) => {
  return (
    <button className='cSmButton' type={type} onClick={onClick}>
      {icon && <i className={icon}></i>} {title}
    </button>
  );
};

export default CSmButton;
