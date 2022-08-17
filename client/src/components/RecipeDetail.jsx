import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/index";

const RecipeDetail = (props) => {
  const recipeDetailRedux = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  //* https://stackoverflow.com/questions/56926282/react-hooks-fetch-wont-stop-fetching

  React.useEffect(() => {
    dispatch(actions.getRecipeDetail(props.match.params.id));
  }, []);

  return (
    <div key={Math.random().toFixed(8)}>
      <div>
        {recipeDetailRedux.title}
        {recipeDetailRedux.id}
        {recipeDetailRedux.summary}
      </div>
    </div>
  );
};

export default RecipeDetail;
