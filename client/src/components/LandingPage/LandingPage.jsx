import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <Link to="/home">
        <div className="header">
          <h1 className="title">Welcome to one more food related web page!</h1>
          <h3>
            Here you will find not only the most awesome and delicious recipes,
            but also you'll be able to create your owns!
          </h3>
          <h4>JUST CLICK HERE!</h4>
        </div>
      </Link>
      <footer>
        Foto de comida mediterranea creado por valeria_aksakova -
        https://www.freepik.es/fotos/comida-mediterranea
      </footer>
    </div>
  );
};

export default LandingPage;
