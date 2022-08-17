//Importar las actions types acá?

const initialState = {
  recipes: [],
  recipeDetail: {},
  newRecipe: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recip) => recip.id != action.payload),
      };
    case "CREATE_RECIPE":
      return {
        ...state,
        newRecipe: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
