import React from "react";

const CInput = ({
  type,
  placeholder,
  name,
  id,
  onChange,
  required,
  value,
  label,
}) => {
  return (
    <div className='cInput'>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={onChange}
        required={required}
        value={value}
      />
    </div>
  );
};

export default CInput;
