import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./recipeDetail.css";

const RecipeDetail = (props) => {
  const recipeDetailRedux = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getRecipeDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]); //*Agregué esto usando el quick fix que ofrecía vsc

  let diets = recipeDetailRedux.diets;
  let dietasStringed = "";
  diets?.forEach((element) => {
    dietasStringed += `${element} | `;
  });

  // function listaDietas(array) {
  //   let listado;
  //   for (let i = 0; i < array.length; i++) {
  //     return <li>{array[i]}</li>;
  //   }
  // }

  // function listadoDiets(array) {
  //   return array.forEach((diet) => {
  //     return <li>{diet}</li>;
  //   });
  // }

  // let listadoDietsLet = listadoDiets(diets);

  // let listaDietasRender = listaDietas(diets);

  //! Voy a tener que modelar mejor el model para que pueda recibir un array de dietas?
  return (
    <div key={recipeDetailRedux.id}>
      <img src={recipeDetailRedux.image} alt="Recipe ilustration" />
      <h2>{recipeDetailRedux.title}</h2>
      <h3>Recipe detail:</h3>
      <div>id: {recipeDetailRedux.id}</div>
      <div>Health score: {recipeDetailRedux.healthScore}</div>
      <div>Dish type: {recipeDetailRedux.dishTypes}</div>
      {recipeDetailRedux?.diet?.length > 0 ? (
        <div> "Length mayor a 0</div>
      ) : (
        <span>Length no es mayor a 0</span>
      )}
      <div>Type of diet: {recipeDetailRedux.diet}</div>

      <div>dietasStringed: {dietasStringed}</div>
      {/*<div>
        Tipo de dietas mapeado:{" "}
        {diets?.map((dieta) => {
          return <div>hola{dieta}</div>;
        })}
      </div> */}
      {/* <span>lista Dietas Render:</span>
      <div>{listaDietasRender}</div> */}
      <span>listadoDiets con forEach</span>
      {/* <div>{listadoDietsLet}</div> */}
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
      <div>
        Instructions:
        <div
          dangerouslySetInnerHTML={{ __html: recipeDetailRedux.instructions }}
        ></div>
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
