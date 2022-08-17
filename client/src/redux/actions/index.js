import axios from "axios";
// import { response } from "../../../../api/src/app";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";

// export const getRecipeDetail = (id) => {
//   return async function (dispatch) {
//     let detallesDeReceta = await axios.get(
//       `http://localhost:3001/recipe/${id}`
//     );
//     dispatch({ type: GET_RECIPE_DETAIL, payload: detallesDeReceta.data });
//   };
// };

export const getRecipeDetail = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_RECIPE_DETAIL, payload: data });
      });
  };
};
