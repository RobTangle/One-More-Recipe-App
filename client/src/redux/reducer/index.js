//Importar las actions types acá?
import {
  GET_RECIPES,
  GET_RECIPE_DETAIL,
  CREATE_RECIPE,
  GET_DIETS,
  GET_ALL_FROM_DB,
  SET_LOADING,
  CLEAR_DETAIL,
  CLEAR_NEW_RECIPE,
  SET_NEW_RECIPE_TO_LOADING,
  SET_DIETS_TO_LOADING,
} from "../actions/index";

const initialState = {
  recipes: { pure: true },
  recipeDetail: {},
  newRecipe: { pure: true },
  allFromDB: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
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
    case CLEAR_NEW_RECIPE:
      return {
        ...state,
        newRecipe: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        recipes: action.payload,
      };
    case SET_NEW_RECIPE_TO_LOADING:
      return {
        ...state,
        newRecipe: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case SET_DIETS_TO_LOADING:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
