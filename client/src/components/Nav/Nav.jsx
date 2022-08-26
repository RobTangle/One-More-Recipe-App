import "./Nav.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";

//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!
export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/">Landing page</Link>
        <Link to="/home">Home</Link>
        <Link to="/home/expRender">expRender</Link>
        <Link to="/home/createRecipe/">Create Recipe</Link>
        {/* <Link to="/home/recipesInDataBase/">Recipes in Data Base</Link> */}
      </div>
    );
  }
}
