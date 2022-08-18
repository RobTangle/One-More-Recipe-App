import "./Nav.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";

//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!
export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/createRecipe/">Create Recipe</Link>
      </div>
    );
  }
}
