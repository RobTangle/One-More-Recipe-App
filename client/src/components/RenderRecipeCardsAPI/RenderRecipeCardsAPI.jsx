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

  //h ----- Funciones auxiliares que podría modularizarlas e importarlas:

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

  //h --algoritmos para ordenar por healthScore:
  function compareHealthScore(a, b) {
    if (a.healthScore < b.healthScore) {
      return -1;
    } else if (a.healthScore > b.healthScore) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareHealthScoreInvert(a, b) {
    if (a.healthScore < b.healthScore) {
      return 1;
    } else if (a.healthScore > b.healthScore) {
      return -1;
    } else {
      return 0;
    }
  }

  //h--- Ordenar por title:
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

  //h--- Ordenar por healthScore:
  function orderByHealthScore() {
    console.log("Se invocó a orderByHealthScore.");
    if (recipesSearched.data) {
      console.log("recipesSearched.data existe.. voy a sortear ahora");
      //altero el orden de la función para ver si es mejor así haciendo el if primero
      recipesSearched.data?.sort(compareHealthScore);
      setLocalState([...recipesSearched.data]);
    } else {
      console.log("recipesSearched.data NO EXISTE en orderByHealthScore!");
      // return <div>NO HAY ELEMENTOS PARA RENDERIZAR</div>; //! no funciona
    }
  }

  function orderByHealthScoreInvert(array) {
    console.log(
      "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
      array
    );
    if (array) {
      //altero el orden de la función para ver si es mejor así haciendo el if primero
      array.sort(compareHealthScoreInvert);
      setLocalState([...recipesSearched.data]);
      console.log("el array después de haber sido sorteado", array);
    } else {
      console.log(
        "recipesSearched.data NO EXISTE en orderByHealthScoreInvert!"
      );
    }
  }

  //h------------y los dos botones de abajo para invocar las funciones
  return (
    <div>
      <button onClick={orderByTitle}>Order by title</button>
      <button onClick={orderByTitleInvert}>Order by title Invert</button>
      {/* //* notar que el order healthScore funciona de dos maneras distintas!: */}
      <button onClick={orderByHealthScore}>Order by Health score</button>
      <button onClick={(e) => orderByHealthScoreInvert(recipesSearched.data)}>
        Order by Health score INVERT
      </button>
      {/* //*---------------------------- */}
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
