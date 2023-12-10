import React from "react";

const CInputWithIcon = ({
  icon,
  type,
  placeholder,
  name,
  id,
  onChange,
  required,
  pattern,
  accept,
}) => {
  return (
    <div className='cInputWithIcon'>
      <div className='cInputWithIcon__icon'>
        <i className={icon}></i>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={onChange}
        required={required}
        pattern={pattern}
        accept={accept}
      />
    </div>
  );
};

export default CInputWithIcon;
