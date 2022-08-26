import React from "react";
import "./recipeCardAPI.css";
import { Link } from "react-router-dom";

const RecipeCardAPI = (props) => {
  return (
    <div key={props.id} className="recipeCardAPI">
      <img
        className="card-img"
        src={props.image}
        alt={`ilustration of recipe id: ${props.id}`}
      />{" "}
      <h3>
        <Link to={`/home/recipes/${props.id}`}> {props.title} </Link>
      </h3>
      {/* <h3>Diets: {dietsToString(props.diets)} </h3> */}
      <h4>Health score: {props.healthScore}</h4>
      <div className="recipe-card-diets">
        <h4>Diets: </h4>
        <ul className="ul-diets">
          {props.diets?.length > 0 ? (
            props.diets.map((dieta) => <li key={Math.random()}>{dieta}</li>)
          ) : (
            <li>no data</li>
          )}
          {/* {props.diets?.map((dieta) => (
            <li key={Math.random()}>{dieta}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCardAPI;
