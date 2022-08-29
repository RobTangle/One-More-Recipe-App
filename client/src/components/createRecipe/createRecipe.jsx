import React from "react";
import { useSelector } from "react-redux";
import "./createRecipe.css";
// import Form from "../CreateRecipeForm/Form";
import bananaGif from "../../assets/470.gif";
import cookingPot from "../../assets/icons8-cooking-pot-48.png";
import zanyFace from "../../assets/icons8-zany-face-48.png";
import OkSVG from "../../assets/icons8-ok.svg";
import Form from "../CreateRecipeForm/Form";

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
            Please, check your internet conection and try again. <br /> Oh, and
            your recipe was lost. So type it all again. Hope you had a back up!{" "}
          </h4>

          <img src={zanyFace} alt="zani face" />
        </div>
      ) : null}
    </div>
  );
};

export default CreateRecipe;
