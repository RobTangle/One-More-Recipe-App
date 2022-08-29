import React from "react";
import "./RecipeCard.css";

const RecipeCard = (props) => {
  return (
    <div className="recipeCard" key={props.id}>
      <h3>{props.title.charAt(0).toUpperCase() + props.title.slice(1)}</h3>
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
//! Esto es peligroso!! Debería arreglarlo!! Tengo permitido con npmodulos tipo html to parse o algo así?

export default RecipeCard;
