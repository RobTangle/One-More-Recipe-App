import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import RecipeCard from "../RecipeCard/RecipeCard";

const DBRecipes = (props) => {
  const recipeInDataBaseRedux = useSelector((state) => state.allFromDB);
  const dispatch = useDispatch();

  //* https://stackoverflow.com/questions/56926282/react-hooks-fetch-wont-stop-fetching

  React.useEffect(() => {
    dispatch(actions.getRecipesFromDB());
  }, [dispatch]); //*Agregué esto usando el quick fix que ofrecía vsc

  // let diets = recipeInDataBaseRedux.diets;
  // let dietasStringed = "";
  // diets?.forEach((element) => {
  //   dietasStringed += `${element} `;
  // });

  //! Voy a tener que modelar mejor el model para que pueda recibir un array de dietas?
  //* PODRÍA CREAR UN COMPONENTE QUE SEA UNA TARJETA PARA CADA RECETA. Y le paso por props para propiedad
  return (
    <>
      {console.log(recipeInDataBaseRedux)}

      {recipeInDataBaseRedux.data?.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            id={recipe.id}
            healthScore={recipe.healthScore}
            summary={recipe.summary}
            diet={recipe.diet}
          />
          //   <div key={Math.random()}>
          //     <h2>{recipe.title}</h2>
          //     <h3>Recipe detail:</h3>
          //     <div>id: {recipe.id}</div>
          //     <div>Health score: {recipe.healthScore}</div>
          //     <div>Dish type: {recipe.dishTypes}</div>
          //     <div>Type of diet: {recipe.diet}</div>
          //   </div>
          // </div>
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
