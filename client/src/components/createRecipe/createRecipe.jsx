import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./createRecipe.css";
import bananaGif from "../../assets/470.gif";
import zanyFace from "../../assets/icons8-zany-face-48.png";
import OkSVG from "../../assets/icons8-ok.svg";
import Form from "../CreateRecipeForm/Form";

const CreateRecipe = () => {
  const newRecipeState = useSelector((state) => state.newRecipe);
  const history = useHistory();
  const redirect = () => {
    history.push("/home");
  };

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
          <button onClick={redirect}>Go to home</button>
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
          <button onClick={redirect}>Go to home</button>
        </div>
      ) : null}
    </div>
  );
};

export default CreateRecipe;
