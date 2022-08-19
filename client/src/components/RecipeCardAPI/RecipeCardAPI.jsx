import React from "react";
import "./recipeCardAPI.css";

// Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)

const RecipeCardAPI = (props) => {
  function dietsToString(diets) {
    let stringed = "";
    diets?.forEach((element) => {
      stringed += element;
    });
    return stringed;
  }

  return (
    <div key={props.id} className="recipeCardAPI">
      <img src={props.image} alt={`ilustration of recipe id: ${props.id}`} />
      <h2>{props.title}</h2>
      <h3>Diets: {dietsToString(props.diets)} </h3>
      <h3>Health score: {props.healthScore}</h3>
    </div>
  );
};

export default RecipeCardAPI;
