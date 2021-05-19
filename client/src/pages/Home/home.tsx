import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./homeStyles.scss";
import { Link } from "react-router-dom";
import { usePostsQuery, PostsQuery } from "../../generated/graphql";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, error, loading } = usePostsQuery();

  if (!loading && !data) {
    return (
      <div>
        <div>Error en la query por alguna razón</div>
        <div>{error?.message}</div>
      </div>
    );
  }

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
      <div>
        {!data && loading ? (
          <div> Cargando... </div>
        ) : (
          <div className="stack">asdasdsa</div>
        )}
      </div>
    </div>
  );
};

export default Home;
