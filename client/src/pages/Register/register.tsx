import React from "react";
import ButtonComponent from "../../components/ButtonComponent/buttonComponent";
import InputComponent from "../../components/inputComponent/inputComponent";
import "./RegisterStyles.css";
import { useRegisterMutation } from "../../generated/graphql";
const Register = () => {
  return (
    <div className="login-box">
      <h2> Registrarse </h2>
      <form>
        <InputComponent name="Username" required={true} />
        <InputComponent name="Email" required={true} />
        <InputComponent name="password" required={true} />
        <InputComponent name="Confirmar password" required={true} />
        <ButtonComponent name="iniciar sesión" />
      </form>
    </div>
  );
};

export default Register;
