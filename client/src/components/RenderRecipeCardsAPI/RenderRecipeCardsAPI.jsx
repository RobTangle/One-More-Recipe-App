import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useEffect } from "react";

const RenderRecipeCardsAPI = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);

  React.useEffect(() => {
    console.log("Me monté o refresqué con [recipesSearched]");
    console.log("Soy recipesSearched: ", recipesSearched);
    setLocalState(recipesSearched);
    console.log(
      "Estoy en el useEffect de [recipesSearched] despues del setLocalState(recipesSearched)",
      localState
    );
  }, [recipesSearched]);

  const [localState, setLocalState] = React.useState([]);

  React.useEffect(() => {
    console.log("Soy el de localState. Me monté o refresqué");
    console.log("Soy el localState: ", localState);
  }, [localState]);

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
    recipesSearched.sort(compareTitleInvert);
    if (recipesSearched) {
      setLocalState([...recipesSearched]);
    } else {
      console.log("recipesSearched.data NO EXISTE en Invert!");
      return <div>NO HAY ELEMENTOS PARA RENDERIZAR</div>; //! no funciona
    }
  }

  //h--- Ordenar por healthScore:
  function orderByHealthScore() {
    //! falta actualizarla para usar el localState como está la INVERT
    console.log("Se invocó a orderByHealthScore.");
    if (recipesSearched.length > 0) {
      console.log("recipesSearched existe.. voy a sortear ahora");
      //altero el orden de la función para ver si es mejor así haciendo el if primero
      recipesSearched.sort(compareHealthScore);
      setLocalState([...recipesSearched]);
    } else {
      console.log("recipesSearched.length < 1 en orderByHealthScore!");
      // return <div>NO HAY ELEMENTOS PARA RENDERIZAR</div>; //! no funciona
    }
  }

  function orderByHealthScoreInvert(array) {
    console.log(
      "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
      array
    );
    if (array) {
      let sortedArray = array.sort(compareHealthScoreInvert);
      let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
      setLocalState(copySortedArray);
      console.log("el localState después de haber sido sorteado", localState);
    } else {
      console.log(
        "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
      );
    }
  }

  //h--- Filter by diets:

  function callBackFilter(receta, diet) {
    if (
      diet == "vegetarian" ||
      diet == "vegan" ||
      diet == "glutenFree" ||
      diet == "dairyFree"
    ) {
      if (receta[diet] && receta[diet] === true) {
        return true;
      }
    }
  }

  function filterByDiet(e) {
    console.log(e.target.id);

    let filteredRecipes = recipesSearched.filter((receta) =>
      callBackFilter(receta, e.target.id)
    );
    console.log(filteredRecipes);
    setLocalState(filteredRecipes);
  }

  //h------------y los botones de abajo para invocar las funciones
  return (
    <div>
      <button id="vegan" onClick={filterByDiet}>
        Filter by vegan diet
      </button>
      <button onClick={orderByTitle}>Order by title</button>
      <button onClick={orderByTitleInvert}>Order by title Invert</button>
      {/* //* notar que el order healthScore funciona de dos maneras distintas!: */}
      <button onClick={orderByHealthScore}>Order by Health score</button>
      <button onClick={(e) => orderByHealthScoreInvert(localState)}>
        Order by Health score INVERT
      </button>
      {/* //*---------------------------- */}
      <div>Renderizado de RenderRecipeCardsAPI: </div>{" "}
      {localState.map((recipeAPI) => {
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
      })}
    </div>
  );
};

export default RenderRecipeCardsAPI;
