import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <Link to="/home">
        <div className="header-h1" id="landing-page-header">
          <h1 className="title">Welcome to One More Recipe App!</h1>
          <h3 className="presentational-text-h3">
            Here you will find not only the most awesome and delicious recipes,
            but also you'll be able to create your own ones!
          </h3>
          <h4>JUST CLICK HERE!</h4>
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
