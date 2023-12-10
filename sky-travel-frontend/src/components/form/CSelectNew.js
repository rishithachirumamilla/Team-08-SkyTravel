import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CSelectNew = ({ label, name, id, options, onChange, required }) => {
  const [resolvedOptions, setResolvedOptions] = useState([]);

  useEffect(() => {
    const resolveOptions = async () => {
      const resolved = await Promise.all(options);
      setResolvedOptions(resolved);
    };

    resolveOptions();
  }, [options]);

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        name={name}
        onChange={onChange}
        required={required}
      >
        {resolvedOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CSelectNew;
