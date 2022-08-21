import React from "react";
import "./recipeCardAPI.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
// Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)

const RecipeCardAPI = (props) => {
  // const dispatch = useDispatch();

  function dietsToString(diets) {
    let stringed = "";
    diets?.forEach((element) => {
      stringed += element;
    });
    return stringed;
  }

  // function handleClickDetail(e) {
  //   console.log("handleSubmitDetail invocado");
  //   e.preventDefault();
  //   dispatch(actions.getRecipeDetail(e.target.id));
  //   console.log(`Soy el e.target.id: ${e.target.id}`);
  //   console.log(e);
  //   console.log(`Despaché el getRecipeDetail con id:  ${e.target.id}`);
  // }

  return (
    <div key={props.id} className="recipeCardAPI">
      <img src={props.image} alt={`ilustration of recipe id: ${props.id}`} />{" "}
      <h2 id={props.id}>
        <Link to={`/home/recipes/${props.id}`}> {props.title} </Link>
      </h2>
      <h3>Diets: {dietsToString(props.diets)} </h3>
      <h3>Health score: {props.healthScore}</h3>
    </div>
  );
};

export default RecipeCardAPI;
