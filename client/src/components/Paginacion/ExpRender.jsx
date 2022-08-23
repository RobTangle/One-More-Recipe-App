import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import * as actions from "../../redux/actions/index";
// import { useEffect } from "react";
import { Paginacion } from "./Paginacion";

const ExpRender = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);

  React.useEffect(() => {
    console.log("Me monté o refresqué con [recipesSearched]");
    console.log("Soy recipesSearched: ", recipesSearched);
    setLocalState(recipesSearched);
  }, [recipesSearched]);

  const [localState, setLocalState] = React.useState([]);

  React.useEffect(() => {
    console.log("Soy el de localState. Me monté o refresqué");
    console.log("Soy el localState: ", localState);
  }, [localState]);

  //!Experimentación con paginado:

  const [page, setPage] = React.useState(1);
  const [quantity, setQuantity] = React.useState(9);

  let maxPages = localState.length / quantity;
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
  // function orderByTitle() {
  //   recipesSearched.data?.sort(compareTitle);
  //   if (recipesSearched.data) {
  //     setLocalState([...recipesSearched.data]);
  //   } else {
  //     return console.log("recipesSearched.data NO EXISTE!");
  //   }
  // }

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

  //h--- Filter by diets EXPERIMENTAL:

  function callBackFilter(receta, diet) {
    console.log(`callBackFilter: receta = ${receta} y diet = ${diet}`);
    if (
      diet === "vegetarian" ||
      diet === "vegan" ||
      diet === "glutenFree" ||
      diet === "dairyFree" ||
      diet === "lowFodmap"
    ) {
      if (receta[diet] && receta[diet] === true) {
        return true;
      }
    }
    if (receta.diets && receta.diets.includes(diet)) {
      return true;
    }
    if (receta.diet && receta.diet.includes(diet)) {
      return true;
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

  //h --- Filter by select option EXPERIMENTAL:

  function onOptionChange(e) {
    console.log(`e.target.value: `, e.target.value);
    let filteredRecipes = recipesSearched.filter((receta) =>
      callBackFilter(receta, e.target.value)
    );
    console.log(`filteredRecipes:`);
    console.log(filteredRecipes);
    setLocalState(filteredRecipes);
  }

  //h------------y los botones de abajo para invocar las funciones
  return (
    <div>
      {/* Voy a tener que ponerlo adentro de un form me parece, y con un botón le doy submit y que active */}
      <label htmlFor="filterDiets">
        <span>Filter by diet</span>
      </label>
      <select name="filterDiet" id="filterDiet" onChange={onOptionChange}>
        <option value="">--Select a diet--</option>
        <option value="glutenFree" id="glutenFree">
          Gluten Free
        </option>
        <option value="dairyFree" id="dairyFree">
          Dairy Free
        </option>
        <option value="vegan" id="vegan">
          Vegan
        </option>
        <option value="vegetarian" id="vegetarian">
          Vegetarian
        </option>
        <option value="lacto-vegeterian" id="lacto-vegeterian">
          Lacto-vegetarian
        </option>
        <option value="ovo-vegeterian" id="ovo-vegeterian">
          Ovo-vegetarian
        </option>
        <option value="pescetarian" id="pescetarian">
          Pescetarian
        </option>
        <option value="ketogenic" id="ketogenic">
          Ketogenic
        </option>
        <option value="paleo" id="paleo">
          Paleo
        </option>
        <option value="primal" id="primal">
          Primal
        </option>
        <option value="lowFodmap" id="low FODMAP">
          Low FODMAP
        </option>
        <option value="whole30" id="whole30">
          Whole30
        </option>
        <option value="omnivore" id="omnivore">
          Omnivore
        </option>
      </select>
      {/* <button id="vegan" onClick={filterByDiet}>
        Filter by vegan diet
      </button> */}
      {/* <button onClick={orderByTitle}>Order by title</button> */}
      <button onClick={orderByTitleInvert}>Order by title Invert</button>
      {/* //* notar que el order healthScore funciona de dos maneras distintas!: */}
      <button onClick={orderByHealthScore}>Order by Health score</button>
      <button onClick={(e) => orderByHealthScoreInvert(localState)}>
        Order by Health score INVERT
      </button>
      {/* //*---------------------------- */}
      <Paginacion page={page} setPage={setPage} maxPages={maxPages} />
      <div>Renderizado de RenderRecipeCardsAPI: </div>{" "}
      {localState
        .slice((page - 1) * quantity, (page - 1) * quantity + quantity)
        .map((recipeAPI, i) => {
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

export default ExpRender;
