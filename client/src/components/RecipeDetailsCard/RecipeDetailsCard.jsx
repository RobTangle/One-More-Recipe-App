import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../../redux/actions/index";
import "./recipeDetailsCard.css";

const RecipeDetailCard = ({ objToRender }) => {
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
    <div key={Math.random()} className="recipe-detail-container">
      <img
        src={
          objToRender.image == null
            ? "https://spoonacular.com/recipeImages/157103-312x231.jpg"
            : objToRender.image
        }
        alt="Recipe ilustration"
      />
      <h2 className="detail-title">{objToRender.title}</h2>
      <div className="detail-div">
        <div className="detail-div-key">id</div>
        {objToRender.id}
      </div>
      <div className="detail-div">
        <div className="detail-div-key">Health score</div>
        <div>{objToRender.healthScore}</div>
      </div>
      <div className="detail-div">
        <div className="detail-div-key">Dish type</div>

        <ul>
          {objToRender?.dishTypes?.length > 0 ? (
            objToRender?.dishTypes?.map((dish) => {
              return <li key={Math.random()}>{dish}</li>;
            })
          ) : (
            <li>No data</li>
          )}
          {/* {objToRender?.dishTypes?.map((dish) => {
            return <li key={Math.random()}>{dish}</li>;
          })} */}
        </ul>
      </div>
      <div className="detail-div">
        <div className="detail-div-key">Type of diets</div>

        <ul>
          {checkDietsAndListThem(objToRender)?.map((el) => {
            return <li key={Math.random()}>{el}</li>;
          })}
        </ul>
      </div>
      <div className="detail-div">
        <div className="detail-div-key">Summary</div>

        <div
          className="detail-summary"
          dangerouslySetInnerHTML={{ __html: objToRender.summary }}
          //! Esto es peligroso!! Debería arreglarlo!! Puedo con npmodulos tipo html to parse o algo así?
        ></div>
      </div>
      <div className="detail-div">
        <div className="detail-div-key">Step by step: </div>
        {typeof objToRender.steps == "string" ? (
          <div className="detail-steps">{objToRender.steps}</div>
        ) : null}
        {Array.isArray(objToRender.steps) ? (
          <ol className="detail-steps-ol">
            {objToRender.steps.map((step) => {
              return <li key={Math.random()}>{step.step}</li>;
            })}
          </ol>
        ) : (
          <div>null</div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailCard;

// Ruta de detalle de receta: debe contener

//  Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
//  Resumen del plato
//  Nivel de "comida saludable" (health score)
//  Paso a paso
