import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import "./renderRecipeCardsAPI.css";
import { Paginacion } from "../Paginacion/Paginacion";
import FilterButtons from "../FilterButtons/FilterButtons";
import {
  callBackFilter,
  orderByHealthScore,
  orderByHealthScoreInvert,
  orderByTitleInvertExp,
  orderByTitleExp,
  // compararTituloAsc,
  // compararTituloDes,
  // compareHealthScoreAsc,
  // compareHealthScoreDes,
  // compareKeyDes,
  // compareKeyAsc,
} from "../../auxiliaryModules/functions";

const RenderRecipeCardsAPI = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("Me monté o refresqué con [recipesSearched]");
    console.log("Soy recipesSearched: ", recipesSearched);
    setLocalState(recipesSearched);
    console.log(
      "Soy useEffect despues del setLocalState(recipesSearched)",
      localState
    );
    dispatch(actions.clearDetail());
  }, [recipesSearched]);

  const [localState, setLocalState] = React.useState([]);

  React.useEffect(() => {
    console.log("Soy el useEffect, localState: ", localState);
  }, [localState]);

  //h Para paginado:
  const [page, setPage] = React.useState(1);
  const [quantity, setQuantity] = React.useState(9);
  let maxPages = localState.length / quantity;

  //h ----- Funciones auxiliares que podría modularizarlas e importarlas:

  //? experimentar modularizar función: ----------------------------------------------

  // function compareKeyAsc(key) {
  //   function compare(a, b) {
  //     if (a[key] < b[key]) {
  //       return -1;
  //     } else if (a[key] > b[key]) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   }
  //   return compare;
  // }

  // function compareKeyDes(key) {
  //   function compare(a, b) {
  //     if (a[key] < b[key]) {
  //       return 1;
  //     } else if (a[key] > b[key]) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   }
  //   return compare;
  // }

  // const compararTituloAsc = compareKeyAsc("title");
  // const compararTituloDes = compareKeyDes("title");
  // const compareHealthScoreAsc = compareKeyAsc("healthScore");
  // const compareHealthScoreDes = compareKeyDes("healthScore");

  //?------------------------------------------------------------------------------------------------------------
  //h--- Ordenar por title:

  // function orderByTitleExp(array) {
  //   console.log(
  //     "Se invocó a orderByTitleExp con este array como argumento: ",
  //     array
  //   );
  //   if (array) {
  //     let sortedArray = array.sort(compararTituloAsc);
  //     let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
  //     setLocalState(copySortedArray);
  //     console.log(
  //       "el localState después de haber sido sorteado por title",
  //       localState
  //     );
  //   } else {
  //     console.log(
  //       "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
  //     );
  //   }
  // }

  // function orderByTitleInvertExp(array) {
  //   console.log(
  //     "Se invocó a orderByTitleInvertExp con este array como argumento: ",
  //     array
  //   );
  //   if (array) {
  //     let sortedArray = array.sort(compararTituloDes);
  //     let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
  //     setLocalState(copySortedArray);
  //     console.log(
  //       "el localState después de haber sido sorteado por title",
  //       localState
  //     );
  //   } else {
  //     console.log(
  //       "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
  //     );
  //   }
  // }

  //h--- Ordenar por healthScore:

  // function orderByHealthScore(array) {
  //   console.log(
  //     "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
  //     array
  //   );
  //   if (array) {
  //     let sortedArray = array.sort(compareHealthScoreAsc);
  //     let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
  //     setLocalState(copySortedArray);
  //     console.log("el localState después de haber sido sorteado", localState);
  //   } else {
  //     console.log(
  //       "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
  //     );
  //   }
  // }

  // function orderByHealthScoreInvert(array) {
  //   console.log(
  //     "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
  //     array
  //   );
  //   if (array) {
  //     let sortedArray = array.sort(compareHealthScoreDes);
  //     let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
  //     setLocalState(copySortedArray);
  //     console.log(
  //       "el localState después de haber sido sorteado invert",
  //       localState
  //     );
  //   } else {
  //     console.log(
  //       "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
  //     );
  //   }
  // }

  //h--- Filter by diets EXPERIMENTAL:

  // function callBackFilter(receta, diet) {
  //   console.log(`callBackFilter: receta = ${receta} y diet = ${diet}`);
  //   if (
  //     diet === "vegetarian" ||
  //     diet === "vegan" ||
  //     diet === "glutenFree" ||
  //     diet === "dairyFree" ||
  //     diet === "lowFodmap"
  //   ) {
  //     if (receta[diet] && receta[diet] === true) {
  //       return true;
  //     }
  //   }
  //   if (receta.diets && receta.diets.includes(diet)) {
  //     return true;
  //   }
  //   if (receta.diet && receta.diet.includes(diet)) {
  //     return true;
  //   }
  // }

  //h --- Filter by select option EXPERIMENTAL:

  // const [filterState, setFilterState] = React.useState("");

  function onFilterOptionChange(e) {
    console.log(`e.target.value: `, e.target.value);
    let filteredRecipes = recipesSearched.filter((receta) =>
      callBackFilter(receta, e.target.value)
    );
    console.log(`filteredRecipes: ${filteredRecipes}`);
    setLocalState([...filteredRecipes]);
    setPage(1); //! agregué esta linea para solucionar problema de filter + paginado. Quedó bien al parecer.
  }

  //h --- Reset filters:
  function resetFilter() {
    console.log("Reset filter...");
    setLocalState(recipesSearched);
    setPage(1);
  }

  return (
    <div key={Math.random()} id="render-container">
      <FilterButtons
        onFilterOptionChange={onFilterOptionChange}
        resetFilter={resetFilter}
      />
      <div className="order-by-container">
        <div className="order-title">
          <span>Order by title: </span>
          <button onClick={(e) => orderByTitleExp(localState, setLocalState)}>
            ¡
          </button>
          <button
            onClick={(e) => orderByTitleInvertExp(localState, setLocalState)}
          >
            !
          </button>
        </div>
        <div className="order-healthScore">
          <span>Order by health score: </span>
          <button
            onClick={(e) => orderByHealthScore(localState, setLocalState)}
          >
            ¡
          </button>
          <button
            onClick={(e) => orderByHealthScoreInvert(localState, setLocalState)}
          >
            !
          </button>
        </div>
      </div>
      {localState.length > 9 ? (
        <Paginacion
          key={Math.random()}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
        />
      ) : null}
      {/* Crear algun tipo de error handler chequeando si localState es un string:  */}
      <div>
        {typeof localState == "string" ? (
          <span>Hubo un error. Lo siento :/</span>
        ) : (
          `${localState.length} recipes found...`
        )}{" "}
      </div>{" "}
      <span id="arriba"></span>
      <div className="render-cards">
        {Array.isArray(localState) && localState.length > 0 ? (
          localState
            .slice((page - 1) * quantity, (page - 1) * quantity + quantity)
            .map((recipeAPI) => {
              return (
                <RecipeCardAPI
                  key={recipeAPI.id}
                  id={recipeAPI.id}
                  title={recipeAPI.title}
                  image={recipeAPI.image}
                  diets={recipeAPI.diets}
                  healthScore={recipeAPI.healthScore}
                />
              );
            })
        ) : (
          <span key={Math.random()}>There are no recipes to show yet...</span>
        )}
      </div>
      {/* {localState.length > 9 ? (
        <Paginacion page={page} setPage={setPage} maxPages={maxPages} />
      ) : null} */}
      {localState.length > 3 ? (
        <div className="go-top">
          <a href="#render-container">Go to the top at the speed of light!</a>
        </div>
      ) : null}
    </div>
  );
};

export default RenderRecipeCardsAPI;
