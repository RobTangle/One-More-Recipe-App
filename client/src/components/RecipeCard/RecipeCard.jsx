import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../../redux/actions/index";
import "./RecipeCard.css";

const RecipeCard = (props) => {
  return (
    <div className="recipeCard" key={props.id}>
      <h3>{props.title}</h3>
      <div>ID: {props.id}</div>
      <div>Health Score: {props.healthScore}</div>
      <div>Diet: {props.diet}</div>
      <div>
        Summary:
        <div dangerouslySetInnerHTML={{ __html: props.summary }}></div>
      </div>
    </div>
  );
};
//! Esto es peligroso!! Debería arreglarlo!! Puedo con npmodulos tipo html to parse o algo así?

export default RecipeCard;
