//Importar las actions types acá?

const initialState = {
  recipes: [],
  recipeDetail: {},
  newRecipe: {},
  allFromDB: [],
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
    case "GET_ALL_FROM_DB":
      return {
        ...state,
        allFromDB: action.payload,
      };
    //!------------------------------
    case "SORT_BY_TITLE":
      function compareTitle(a, b) {
        // a should come before b in the sorted order
        if (a.title < b.title) {
          return -1;
          // a should come after b in the sorted order
        } else if (a.title > b.title) {
          return 1;
          // and and b are the same
        } else {
          return 0;
        }
      }
      return {
        ...state,
        allFromDB: state.allFromDB.sort(compareTitle),
      };
    //!------------------------------
    default:
      return state;
  }
};

export default rootReducer;
