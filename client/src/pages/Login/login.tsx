import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/buttonComponent";
import InputComponent from "../../components/inputComponent/inputComponent";
import "./LoginStyles.css";
import { useMutation } from "@apollo/client";
import {
  useLoginMutation,
  LoginMutation,
  MeQuery,
  MeDocument,
} from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [login, { data, error }] = useLoginMutation();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { usernameOrEmail: username, password },
      });

      if (data?.login.errors!) {
        console.log(data?.login.errors![0].path);
        if (data?.login.errors![0].path === "usernameOrEmail") {
          setUsernameError("Por favor ingrese el usuario correctamente");
        }

        if (data?.login.errors![0].path === "password") {
          setPasswordError("Por favor ingrese la contraseña correctamente");
        }
      }

      if (data?.login.user) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-box">
      <h2> Iniciar sesión </h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          {usernameError ? (
            <text className="errorText">{usernameError}</text>
          ) : null}
          <InputComponent
            type="text"
            name="Username"
            required={true}
            onChange={(e: any) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="container">
          {passwordError ? (
            <text className="errorText"> {passwordError} </text>
          ) : null}
          <InputComponent
            type="password"
            name="password"
            required={true}
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <ButtonComponent name="iniciar sesión" type="submit" />
        {console.log(password, username)}
      </form>
    </div>
  );
};

export default Login;
