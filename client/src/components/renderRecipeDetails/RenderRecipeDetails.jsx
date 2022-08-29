import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
// import "../RecipeDetail";
import bananaGif from "../../assets/470.gif";
import RecipeDetailCard from "../RecipeDetailsCard/RecipeDetailsCard";

const RenderRecipeDetail = (props) => {
  const recipeDetailRedux = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getRecipeDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]); //*Agregué esto usando el quick fix que ofrecía vsc

  return (
    <div key={Math.random()} className="recipe-detail-container">
      {recipeDetailRedux.title ? (
        <RecipeDetailCard objToRender={recipeDetailRedux} />
      ) : (
        <img src={bananaGif} alt="gif de carga" />
      )}
    </div>
  );
};

export default RenderRecipeDetail;
