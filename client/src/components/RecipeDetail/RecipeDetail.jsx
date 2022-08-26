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

  function checkDietsAndListThem(obj) {
    let dietas = [];
    if (obj.vegetarian && obj.vegetarian === true) {
      dietas.push("vegetarian");
    }
    if (obj.vegan && obj.vegan === true) {
      dietas.push("vegan");
    }
    if (obj.glutenFree && obj.glutenFree === true) {
      dietas.push("gluten free");
    }
    if (obj.dairyFree && obj.dairyFree === true) {
      dietas.push("dairyFree");
    }
    if (obj.lowFodmap && obj.lowFodmap === true) {
      dietas.push("lowFodmap");
    }
    obj?.diets?.forEach((d) => {
      if (!dietas.includes(d)) {
        dietas.push(d);
      }
    });
    if (dietas.length === 0) {
      return ["no data loaded"];
    } else {
      return dietas;
    }
  }

  return (
    <div key={Math.random()}>
      <img
        src={
          recipeDetailRedux.image == null
            ? "https://spoonacular.com/recipeImages/157103-312x231.jpg"
            : recipeDetailRedux.image
        }
        alt="Recipe ilustration"
      />
      <h2>{recipeDetailRedux.title}</h2>
      <div>id: {recipeDetailRedux.id}</div>
      <div>Health score: {recipeDetailRedux.healthScore}</div>
      <div>
        Dish type:
        <ul>
          {recipeDetailRedux?.dishTypes?.map((dish) => {
            return <li key={Math.random()}>{dish}</li>;
          })}
        </ul>
      </div>
      <div>Type of diets:</div>
      <ul>
        {checkDietsAndListThem(recipeDetailRedux)?.map((el) => {
          return <li key={Math.random()}>{el}</li>;
        })}
      </ul>
      <div>
        Summary:
        {/* <>{recipeDetailRedux.summary}</> */}
        <div
          dangerouslySetInnerHTML={{ __html: recipeDetailRedux.summary }}
          //! Esto es peligroso!! Debería arreglarlo!! Puedo con npmodulos tipo html to parse o algo así?
        ></div>
        <div>
          <div>Step by step: </div>
          {typeof recipeDetailRedux.steps == "string" ? (
            recipeDetailRedux.steps
          ) : (
            <div>No data</div>
          )}
          {Array.isArray(recipeDetailRedux.steps) ? (
            <ol>
              {recipeDetailRedux.steps.map((step) => {
                return <li key={Math.random()}>{step.step}</li>;
              })}
            </ol>
          ) : (
            <span></span>
          )}
        </div>
        <hr />
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
