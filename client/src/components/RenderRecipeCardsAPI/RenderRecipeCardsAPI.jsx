import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useEffect } from "react";

const RenderRecipeCardsAPI = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);
  const [localState, setLocalState] = React.useState([]);

  React.useEffect(() => {
    console.log("Me monté");
  }, [recipesSearched]);

  function orderByTitle() {
    recipesSearched.data?.sort(compareTitle);
    if (recipesSearched.data) {
      setLocalState([...recipesSearched.data]);
    } else {
      return console.log("recipesSearched.data NO EXISTE!");
    }
  }

  function orderByTitleInvert() {
    recipesSearched.data?.sort(compareTitleInvert);
    if (recipesSearched.data) {
      setLocalState([...recipesSearched.data]);
    } else {
      console.log("recipesSearched.data NO EXISTE en Invert!");
      return <div>NO HAY ELEMENTOS PARA RENDERIZAR</div>; //! no funciona
    }
  }
  //h--algoritmos para ordenar por title:
  function compareTitle(a, b) {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareTitleInvert(a, b) {
    if (a.title < b.title) {
      return 1;
    } else if (a.title > b.title) {
      return -1;
    } else {
      return 0;
    }
  }
  //h------------y los dos botones de abajo para invocar las funciones
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
