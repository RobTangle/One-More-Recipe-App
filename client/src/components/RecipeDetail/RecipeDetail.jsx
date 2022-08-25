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

  // let diets = recipeDetailRedux.diets;
  // let dietasStringed = "";
  // diets?.forEach((element) => {
  //   dietasStringed += `${element} | `;
  // });

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

  // function listaDietas(array) {
  //   let listado;
  //   for (let i = 0; i < array.length; i++) {
  //     return <li>{array[i]}</li>;
  //   }
  // }

  // function checkDishTypesAndListThem(array) {
  //   array.forEach((dishType) => {
  //     return <li>{dishType}</li>;
  //   });
  // }

  // let listadoDietsLet = listadoDiets(diets);

  // let listaDietasRender = listaDietas(diets);

  //! Voy a tener que modelar mejor el model para que pueda recibir un array de dietas?
  return (
    <div key={recipeDetailRedux.id}>
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
            return <li>{dish}</li>;
          })}
        </ul>
      </div>
      <div>Type of diets:</div>
      <ul>
        {checkDietsAndListThem(recipeDetailRedux)?.map((el) => {
          return <li>{el}</li>;
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
            recipeDetailRedux.steps.map((step) => {
              return <li>{step}</li>;
            })
          ) : (
            <div>No data for steps</div>
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
