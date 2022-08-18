import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

const RecipeCard = (props) => {
  const recipeDetailRedux = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  //* https://stackoverflow.com/questions/56926282/react-hooks-fetch-wont-stop-fetching

  React.useEffect(() => {
    dispatch(actions.getRecipes(props.match.params.id));
  }, [dispatch, props.match.params.id]); //*Agregué esto usando el quick fix que ofrecía vsc

  let diets = recipeDetailRedux.diets;
  let dietasStringed = "";
  diets?.forEach((element) => {
    dietasStringed += `${element} `;
  });

  return (
    <div>
      <h5>div de receta</h5>
    </div>
  );
};

export default RecipeCard;
