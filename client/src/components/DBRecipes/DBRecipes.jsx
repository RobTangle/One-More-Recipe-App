import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import RecipeCard from "../RecipeCard/RecipeCard";

const DBRecipes = (props) => {
  const recipeInDataBaseRedux = useSelector((state) => state.allFromDB);
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState([]);
  //* https://stackoverflow.com/questions/56926282/react-hooks-fetch-wont-stop-fetching

  React.useEffect(() => {
    // dispatch(actions.getRecipesFromDB());
    console.log("Me monté");
    // setLocalState([...recipeInDataBaseRedux.sort((a, b) => a.title - b.title)]);
  }, [recipeInDataBaseRedux]); //*Agregué esto usando el quick fix que ofrecía vsc

  // let diets = recipeInDataBaseRedux.diets;
  // let dietasStringed = "";
  // diets?.forEach((element) => {
  //   dietasStringed += `${element} `;
  // });
  function sortear() {
    dispatch(actions.sortByTitle());
  }

  function sortearRecipeInDB() {
    recipeInDataBaseRedux.sort(compareTitle);
    setLocalState([...recipeInDataBaseRedux]);
  }

  function compareTitle(a, b) {
    // a should come before b in the sorted order
    if (a.title < b.title) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.title > b.title) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }

  function traerRecetas() {
    console.log("trayendo recetas!");
    dispatch(actions.getRecipesFromDB());
  }

  //! Voy a tener que modelar mejor el model para que pueda recibir un array de dietas?
  //* PODRÍA CREAR UN COMPONENTE QUE SEA UNA TARJETA PARA CADA RECETA. Y le paso por props para propiedad
  return (
    <>
      {console.log(recipeInDataBaseRedux)}
      <button onClick={sortearRecipeInDB}>Sortear RecipeInDBRedux</button>
      <button onClick={sortear}>Sort</button>
      <button onClick={traerRecetas}>Traer recetas</button>
      {recipeInDataBaseRedux.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            id={recipe.id}
            healthScore={recipe.healthScore}
            summary={recipe.summary}
            diet={recipe.diet}
          />
        );
      })}
    </>
  );
};

export default DBRecipes;

// Ruta de detalle de receta: debe contener

//  Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
//  Resumen del plato
//  Nivel de "comida saludable" (health score)
//  Paso a paso
