import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

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
  return (
    <>
      {console.log(recipeInDataBaseRedux)}

      {recipeInDataBaseRedux.data?.map((recipe) => {
        return (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <h3>Recipe detail:</h3>
            <div>id: {recipe.id}</div>
            <div>Health score: {recipe.healthScore}</div>
            <div>Dish type: {recipe.dishTypes}</div>
            <div>Type of diet: {recipe.diet}</div>
          </div>
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
