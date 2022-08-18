import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

const RecipeDetail = (props) => {
  const recipeDetailRedux = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  //* https://stackoverflow.com/questions/56926282/react-hooks-fetch-wont-stop-fetching

  React.useEffect(() => {
    dispatch(actions.getRecipeDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]); //*Agregué esto usando el quick fix que ofrecía vsc

  let diets = recipeDetailRedux.diets;
  let dietasStringed = "";
  diets?.forEach((element) => {
    dietasStringed += `${element} `;
  });

  //! Voy a tener que modelar mejor el model para que pueda recibir un array de dietas?
  return (
    <div key={recipeDetailRedux.id}>
      <h2>{recipeDetailRedux.title}</h2>
      <h3>Recipe detail:</h3>
      <div>id: {recipeDetailRedux.id}</div>
      <div>Health score: {recipeDetailRedux.healthScore}</div>
      <div>Dish type: {recipeDetailRedux.dishTypes}</div>
      <div>Type of diet: {recipeDetailRedux.diet}</div>

      {/* <div>dietasStringed: {dietasStringed}</div>
      <div>
        Tipo de dietas mapeado:{" "}
        {diets?.map((dieta) => {
          return <div>hola{dieta}</div>;
        })}
      </div> */}
      <div>
        Summary:
        <div
          dangerouslySetInnerHTML={{ __html: recipeDetailRedux.summary }}
          //! Esto es peligroso!! Debería arreglarlo!! Puedo con npmodulos tipo html to parse o algo así?
        ></div>
        <div>Step by step: {recipeDetailRedux.steps}</div>
        <hr />
        {/* <>{recipeDetailRedux.summary}</> */}
      </div>
    </div>
  );
};

export default RecipeDetail;

// Ruta de detalle de receta: debe contener

//  Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
//  Resumen del plato
//  Nivel de "comida saludable" (health score)
//  Paso a paso
