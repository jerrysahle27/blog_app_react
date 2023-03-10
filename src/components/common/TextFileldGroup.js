import React from "react";
import TextField from "@mui/material/TextField";
const TextFileldGroup = ({
  name,
  placeholder,
  autocomplete,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  margin,
}) => {
  return (
    <div>
      <TextField
        margin={margin}
        id="email-address"
        label={label}
        name={name}
        type={type}
        autoComplete={autocomplete}
        required
        className="relative w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextFileldGroup;
