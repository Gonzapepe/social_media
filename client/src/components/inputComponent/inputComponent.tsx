import React from "react";
import "./inputComponentStyles.css";

const InputComponent = ({ name, required, value, onChange, type }: any) => {
  return (
    <div className="user-box">
      <input
        type={type}
        name=""
        required={required}
        value={value}
        onChange={onChange}
      />
      <label> {name} </label>
    </div>
  );
};

export default InputComponent;
