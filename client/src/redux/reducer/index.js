//Importar las actions types acá?
import {
  GET_RECIPES,
  GET_RECIPE_DETAIL,
  CREATE_RECIPE,
  GET_ALL_FROM_DB,
  CLEAR_DETAIL,
} from "../actions/index";

const initialState = {
  recipes: [],
  recipeDetail: {},
  newRecipe: {},
  allFromDB: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload.data, //agregué .data 21/08 20:20hs
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        newRecipe: action.payload,
      };
    case GET_ALL_FROM_DB:
      return {
        ...state,
        allFromDB: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
