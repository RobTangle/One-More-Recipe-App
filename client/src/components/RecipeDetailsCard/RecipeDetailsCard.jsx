import React from "react";
import "./recipeDetailsCard.css";
import { checkDietsAndListThem } from "../../auxiliaryModules/functions";

const RecipeDetailCard = ({ objToRender }) => {
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
          //! Esto es peligroso!! Debería arreglarlo!! Tengo permitido usar npmodulos tipo html to parse o algo así?
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
        ) : null}
      </div>
    </div>
  );
};

export default RecipeDetailCard;
