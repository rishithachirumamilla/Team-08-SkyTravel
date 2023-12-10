import React from "react";

const Warning = ({ title }) => {
  return (
    <div className='warning'>
      <div className='warning__upper'>
        <div className='warning__upper__left'>
          <i className='fa-solid fa-triangle-exclamation'></i>
        </div>
        <span> Warning</span>
      </div>
      <div className='warning__lower'>
        <p>
          This may result in permanent removal of "{title}" and sub-records.
        </p>
      </div>
    </div>
  );
};

export default Warning;
