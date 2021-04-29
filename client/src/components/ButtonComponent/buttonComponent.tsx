import React from "react";
import "./buttonComponentStyles.css";

const ButtonComponent = ({ name, required, onClick, type }: any) => {
  return (
    <button className="button-style" onClick={onClick} type={type}>
      {name}
    </button>
  );
};

export default ButtonComponent;
