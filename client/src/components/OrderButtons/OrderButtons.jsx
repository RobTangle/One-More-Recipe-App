import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import * as actions from "../../redux/actions/index";
// import { useEffect } from "react";
import "./renderRecipeCardsAPI.css";
import { Paginacion } from "../Paginacion/Paginacion";
import * as actions from "../../redux/actions";
import { useDispatch } from "react-redux";

//le meto por props los estados que quiero filtrar y los setStates que tengo que usar.
// props: localState, setLocalState, setPage
const OrderButtons = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("OrderButtons useEffect");
    console.log("Soy recipesSearched: ", recipesSearched);
    props.setLocalState(recipesSearched); //! esto está bien acá? o es redundante?
    console.log(
      "useEffect de OrderButtonsdespues del setLocalState(recipesSearched)",
      props.localState
    );
    dispatch(actions.clearDetail()); //! esto es redundante?
  }, [recipesSearched]);

  // const [localState, setLocalState] = React.useState([]);

  // React.useEffect(() => {
  //   console.log("Soy el de localState. Me monté o refresqué");
  //   console.log("Soy el localState: ", localState);
  // }, [localState]);

  // //!Experimentación con paginado:

  // const [page, setPage] = React.useState(1);
  // const [quantity, setQuantity] = React.useState(9);

  // let maxPages = localState.length / quantity;

  //h ----- Funciones auxiliares que podría modularizarlas e importarlas:

  //? experimentar modularizar función: ----------------------------------------------

  function compareKeyAsc(key) {
    function compare(a, b) {
      if (a[key] < b[key]) {
        return -1;
      } else if (a[key] > b[key]) {
        return 1;
      } else {
        return 0;
      }
    }
    return compare;
  }

  function compareKeyDes(key) {
    function compare(a, b) {
      if (a[key] < b[key]) {
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      } else {
        return 0;
      }
    }
    return compare;
  }

  const compararTituloAsc = compareKeyAsc("title");
  const compararTituloDes = compareKeyDes("title");
  const compareHealthScoreAsc = compareKeyAsc("healthScore");
  const compareHealthScoreDes = compareKeyDes("healthScore");

  //?------------------------------------------------------------------------------------------------------------
  //h--- Ordenar por title:

  //?---experimental copiando a healthscore:

  function orderByTitleExp(array) {
    console.log(
      "Se invocó a orderByHealthTitleExp con este array como argumento: ",
      array
    );
    if (array) {
      let sortedArray = array.sort(compararTituloAsc);
      let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
      props.setLocalState(copySortedArray);
      console.log(
        "el localState después de haber sido sorteado por title",
        props.localState
      );
    } else {
      console.log(
        "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
      );
    }
  }

  function orderByTitleInvertExp(array) {
    console.log(
      "Se invocó a orderByTitleInvertExp con este array como argumento: ",
      array
    );
    if (array) {
      let sortedArray = array.sort(compararTituloDes);
      let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
      props.setLocalState(copySortedArray);
      console.log(
        "el localState después de haber sido sorteado por title",
        props.localState
      );
    } else {
      console.log(
        "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
      );
    }
  }

  //h--- Ordenar por healthScore:

  function orderByHealthScore(array) {
    console.log(
      "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
      array
    );
    if (array) {
      let sortedArray = array.sort(compareHealthScoreAsc);
      let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
      props.setLocalState(copySortedArray);
      console.log(
        "el localState después de haber sido sorteado",
        props.localState
      );
    } else {
      console.log(
        "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
      );
    }
  }

  function orderByHealthScoreInvert(array) {
    console.log(
      "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
      array
    );
    if (array) {
      let sortedArray = array.sort(compareHealthScoreDes);
      let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
      props.setLocalState(copySortedArray);
      console.log(
        "el localState después de haber sido sorteado invert",
        props.localState
      );
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

  //h --- Filter by select option EXPERIMENTAL:

  function onFilterOptionChange(e) {
    console.log(`e.target.value: `, e.target.value);
    let filteredRecipes = recipesSearched.filter((receta) =>
      callBackFilter(receta, e.target.value)
    );
    console.log(`filteredRecipes: ${filteredRecipes}`);
    props.setLocalState([...filteredRecipes]);
    props.setPage(1); //! agregué esta linea para solucionar problema de filter + paginado. Quedó bien al parecer.
  }

  //h --- Reset filters:

  function resetFilter() {
    console.log("Reset filter...");
    props.setLocalState(recipesSearched);
  }

  return (
    <div className="filter-order-container">
      <label htmlFor="filterDiets">
        <span>Filter by diet</span>
      </label>
      <select name="filterDiet" id="filterDiet" onChange={onFilterOptionChange}>
        <option value="" id="default">
          --Select a diet--
        </option>
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
      <button className="reset-filter" onClick={resetFilter}>
        Reset filters
      </button>
      <div className="order-by-container">
        <div className="order-title">
          <span>Order by title: </span>
          <button onClick={(e) => orderByTitleExp(props.localState)}>¡</button>
          <button onClick={(e) => orderByTitleInvertExp(props.localState)}>
            !
          </button>
        </div>
        <div className="order-healthScore">
          <span>Order by health score: </span>
          <button onClick={(e) => orderByHealthScore(props.localState)}>
            ¡
          </button>
          <button onClick={(e) => orderByHealthScoreInvert(props.localState)}>
            !
          </button>
        </div>
      </div>
    </div>
  );
};
