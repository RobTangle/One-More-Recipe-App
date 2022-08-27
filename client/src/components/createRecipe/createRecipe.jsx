import React from "react";
import { useSelector } from "react-redux";
import "./createRecipe.css";
import Form from "../CreateRecipeForm/Form";
import bananaGif from "../../assets/470.gif";
import OkSVG from "../../assets/icons8-ok.svg";

const CreateRecipe = () => {
  const newRecipeState = useSelector((state) => state.newRecipe);

  return (
    <div className="createRecipe-container">
      {newRecipeState.pure ? <Form /> : null}
      {newRecipeState.loading ? (
        <img src={bananaGif} alt="loading gif" />
      ) : null}
      {newRecipeState.title ? (
        <div className="new-recipe-ok-message">
          <img src={OkSVG} alt="" />
          <h2>Recipe with title "{newRecipeState.title}" created!</h2>
        </div>
      ) : null}
      {newRecipeState.error ? (
        <div className="new-recipe-error-message">
          <h2>Ups! We stumbled over an error: "{newRecipeState.error}"</h2>
          <h4>
            It seems that the recipe was lost. Please, check your internet
            conection and try again
          </h4>
        </div>
      ) : null}
    </div>
  );
};

export default CreateRecipe;
