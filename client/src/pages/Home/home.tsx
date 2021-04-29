import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./homeStyles.scss";
import { Link } from "react-router-dom";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div className="body">
      <nav className="nav">
        <div className="nav__title">Socializer</div>
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="links" to="/">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link className="links" to="/login">
              Iniciar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
//asdadas
