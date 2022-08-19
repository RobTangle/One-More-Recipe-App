import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useEffect } from "react";

const RenderRecipeCardsAPI = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);
  // const [localState, setLocalState] = React.useState([recipesSearched])
  // React.useEffect(() => {}, []);
  // const dispatch = useDispatch();
  //h-------------probando ordenar por title:
  function orderByTitle() {
    recipesSearched?.data.sort((a, b) => a.title - b.title);
  }

  function orderByTitleInvert() {
    recipesSearched?.data.sort((a, b) => b.title - a.title);
  }
  //h-----------------------------y los dos botones de abajo tmb son de esta prueba
  return (
    <div>
      <button onClick={orderByTitle}>Order by title</button>
      <button onClick={orderByTitleInvert}>Order by title Invert</button>
      <div>Renderizado de RenderRecipeCardsAPI: </div>{" "}
      {recipesSearched.data?.map((recipeAPI) => {
        return (
          <RecipeCardAPI
            key={recipeAPI.id}
            title={recipeAPI.title}
            image={recipeAPI.image}
            diets={recipeAPI.diets}
            healthScore={recipeAPI.healthScore}
          />
        );
      })}
    </div>
  );
};

export default RenderRecipeCardsAPI;
