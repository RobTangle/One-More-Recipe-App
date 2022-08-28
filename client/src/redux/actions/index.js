import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_ALL_FROM_DB = "GET_ALL_FROM_DB";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_NEW_RECIPE = "CLEAR_NEW_RECIPE";
export const SET_LOADING = "SET_LOADING";
export const SET_NEW_RECIPE_TO_LOADING = "SET_NEW_RECIPE_TO_LOADING";
export const SET_DIETS_TO_LOADING = "SET_DIETS_TO_LOADING";

// export const getRecipeDetail = (id) => {
//   return async function (dispatch) {
//     let detallesDeReceta = await axios.get(
//       `http://localhost:3001/recipe/${id}`
//     );
//     dispatch({ type: GET_RECIPE_DETAIL, payload: detallesDeReceta.data });
//   };
// };

// export const getRecipeDetail = (id) => {
//   return async function (dispatch) {
//     try {
//       const response = await fetch(`http://localhost:3001/recipes/${id}`);
//       const data = await response.json();
//       dispatch({ type: GET_RECIPE_DETAIL, payload: data });
//     } catch (error) {
//       console.log(error.message);
//       return error;
//     }
//   };
// };

export const getRecipeDetail = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_RECIPE_DETAIL, payload: data });
      })
      .catch((error) => {
        console.log(error);
        let errorObject = {
          title: `There was an error! :( ERROR: ${error.message}`,
          summary: `ERROR: ${error.message}. Try checking your internet connection.`,
          healthScore: 0,
          steps: [],
          dishTypes: ["null"],
          image: "https://clipground.com/images/avoid-junk-food-clipart-7.jpg",
          diets: ["null"],
          error: error.message,
        };
        dispatch({ type: GET_RECIPE_DETAIL, payload: errorObject });
        return error;
      });
  };
};

export const createRecipe = (obj) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`http://localhost:3001/recipes/`, obj);
      return dispatch({ type: CREATE_RECIPE, payload: response.data });
    } catch (error) {
      let errorObj = {
        error: error.message,
      };
      return dispatch({ type: CREATE_RECIPE, payload: errorObj });
    }
  };
};

export const setRecipesToLoading = () => {
  return async function (dispatch) {
    try {
      return dispatch({ type: SET_LOADING, payload: { loading: true } });
    } catch (error) {
      return error.message;
    }
  };
};

export const setNewRecipeToLoading = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_NEW_RECIPE_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      dispatch({
        type: SET_NEW_RECIPE_TO_LOADING,
        payload: { error: error.message },
      });
      return error.message;
    }
  };
};

export const getRecipesFromDB = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/recipes/getAllFromDB`
      );
      return dispatch({ type: GET_ALL_FROM_DB, payload: response.data });
    } catch (error) {
      console.log("ERROR EN getRecipesFromDB");
      return error.message;
    }
  };
};

export const getRecipesByQuery = (query) => {
  return async function (dispatch) {
    try {
      console.log("TRY de getRecipesByQUERY");
      let response = await axios.get(`http://localhost:3001/recipes/?${query}`);
      return dispatch({ type: GET_RECIPES, payload: response.data }); //le acabo de agregar el .data xq le borré el .data al reducer
    } catch (error) {
      let errorObject = {
        title: `There was an error! :( ERROR: ${error.message}`,
        summary: `ERROR: ${error.message}. Try checking your internet connection.`,
        healthScore: 0,
        steps: [],
        dishTypes: ["null"],
        image: "https://clipground.com/images/avoid-junk-food-clipart-7.jpg",
        diets: ["null"],
        error: error.message,
      };
      dispatch({ type: GET_RECIPES, payload: errorObject });
      console.log("ERROR AL getRecipesBydiet: " + error.message);
      return error.message;
    }
  };
};

export const clearDetail = () => {
  return function (dispatch) {
    try {
      return dispatch({ type: CLEAR_DETAIL, payload: "" });
    } catch (error) {
      return error.message;
    }
  };
};

export const clearNewRecipe = () => {
  return async function (dispatch) {
    try {
      return dispatch({ type: CLEAR_NEW_RECIPE, payload: { pure: true } });
    } catch (error) {
      return dispatch({
        type: CLEAR_NEW_RECIPE,
        payload: { error: error.message },
      });
    }
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/diets`);
      return dispatch({ type: GET_DIETS, payload: response.data });
    } catch (error) {
      console.log("En action getDiets: " + error.message);
      return dispatch({ type: GET_DIETS, payload: { error: error.message } });
    }
  };
};

export const setDietsToLoading = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_DIETS_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      return dispatch({
        type: SET_DIETS_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
};
