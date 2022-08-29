import "./Nav.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav" id="nav-container">
        {/* <Link to="/">Landing page</Link> */}
        <Link to="/home">Home</Link>
        {/* <Link to="/home/expRender">expRender</Link> */}
        <Link to="/home/createRecipe/">Create Recipe</Link>
        {/* <Link to="/home/recipesInDataBase/">Recipes in Data Base</Link> */}
      </div>
    );
  }
}
