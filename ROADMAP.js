// API Key de Spoontacular:
// 08627e517b4943fe9b66893317a91541

//* Enunciado
// La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa spoonacular y a partir de ella poder, entre otras cosas:
// Buscar recetas
// Filtrarlos / Ordenarlos
// Crear nuevas recetas propias

//h 2) Crear rutas. Cada ruta con su propio archivo adentro de /routes.
//Ojo que acá me van a hacer hacer un fetch a una api, y le voy a pasar a api los detalles que queiren ver. Por ejemplo, si el cliente le hace click a una receta en partícular, en la url va a parecer como query o params el id de esa receta que clickeó. Y al llegar el id de esa receta que el cliente quiere ver en más detalle, yo hago una busqueda del id de esa receta a la API. Si la id empieza con db-188 por ejemplo, voy a hacer la búsqueda en mi DB. Pero si no tiene un db en el id, voy a buscar directamente en la API.
//También puede pasar que no quiera buscar un ID si no algo más general. Entonces voy a tener que enviarle las recetas que están en la API y también las de la DB.
//Tendría que recoger los datos de los dos servidores, concatenarlos y enviarlos al usuario.
//Si pudiese tener una ruta exclusiva para las recetas creadas por el usuario, sería más fácil. Pero no..
//* En el POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.

//*NOTAS: -----------------------------------------------------------------------------------------
//*Practicar pasar de async await a promesas, ida y vuelta ;)
//*Pensar bien la estructura de cada app, pensar el rol de cada componente, micro y macro, Detallar y escribir los detalles de cada parte de la app. Esto me va a ayudar a entender bien todo.
//* El archivo app.js importa el objeto de rutas y lo usa como middleware, con un server.use(router)

//! PROBLEMAS DETECTADOS PARA SOLUCIONAR:

//! * El select filter no se resetea despues de resetear los filtros.
//! * Creo que no renderizo bien TODAS las diets de las API (las que estan como propiedades creo que no las renderizo)
//H ITINERARIO: ----------------------------------------------------------------------------------

//H * Pensar estilos, y despues terminar recipeDetails.

//h * Poner estados de "loading" o error

//h * Validaciones

//h * Para agregar como imagen a mis recetas posteadas, al momento de renderizar: https://spoonacular.com/recipeImages/157103-312x231.jpg Es la misma que spoonacular. Aunque parece que no se dimensiona bien y sobresale de ancho. O buscar cualquier otra que vaya bien con mis estilos.
//h * Error handlings
//h * Hacer ordenamiento por readyInMinutes

//? IDEAS: -----------------------------------------------------------------------------------------
//? 1* Podría hacer un ordenamiento según el readyInMinutes!
//? RANDOM:

//?--------------------------------------------------------

//* https://stackoverflow.com/questions/56926282/react-hooks-fetch-wont-stop-fetching

//FUNCIÓN PARA PASAR LOS QUERY A STRING QUE VA A IR A LA URL:
let query = {
  name: "Veggie",
  healthScore: 82,
};
function fromQueryToURL(obj) {
  let urleado = "";
  for (const [key, value] of Object.entries(obj)) {
    urleado += `${key}=${value}&`;
  }
  return urleado;
}

//* DIETAS:
[
  { name: "gluten free", id: 1 },
  { name: "ketogenic", id: 2 },
  { name: "vegetarian", id: 3 },
  { name: "lacto-vegetarian", id: 4 },
  { name: "ovo-vegetarian", id: 5 },
  { name: "vegan", id: 6 },
  { name: "pescetarian", id: 7 },
  { name: "paleo", id: 8 },
  { name: "primal", id: 9 },
  { name: "low FODMAP", id: 10 },
  { name: "whole30", id: 11 },
  { name: "omnivore", id: 12 },
];

//h --algoritmos EN DESUSO para ordenar por healthScore:
// function compareHealthScore(a, b) {
//   if (a.healthScore < b.healthScore) {
//     return -1;
//   } else if (a.healthScore > b.healthScore) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

// function compareHealthScoreInvert(a, b) {
//   if (a.healthScore < b.healthScore) {
//     return 1;
//   } else if (a.healthScore > b.healthScore) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

//* orderByHealthScore que andan bien pero no son las modularizadas. Las reemplacé por las otras. :
// function orderByHealthScore(array) {
//   console.log(
//     "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
//     array
//   );
//   if (array) {
//     let sortedArray = array.sort(compareHealthScore);
//     let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
//     setLocalState(copySortedArray);
//     console.log("el localState después de haber sido sorteado", localState);
//   } else {
//     console.log(
//       "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
//     );
//   }
// }

// function orderByHealthScoreInvert(array) {
//   console.log(
//     "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
//     array
//   );
//   if (array) {
//     let sortedArray = array.sort(compareHealthScoreInvert);
//     let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
//     setLocalState(copySortedArray);
//     console.log(
//       "el localState después de haber sido sorteado invert",
//       localState
//     );
//   } else {
//     console.log(
//       "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
//     );
//   }
// }

//h--algoritmos para ordenar por title en DESUSO:
// function compareTitle(a, b) {
//   if (a.title < b.title) {
//     return -1;
//   } else if (a.title > b.title) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

// function compareTitleInvert(a, b) {
//   if (a.title < b.title) {
//     return 1;
//   } else if (a.title > b.title) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

//h--- Ordenar por title:

//! en desuso:
// function orderByTitle() {
//   recipesSearched.data?.sort(compareTitle);
//   if (recipesSearched.data) {
//     setLocalState([...recipesSearched.data]);
//   } else {
//     return console.log("recipesSearched.data NO EXISTE!");
//   }
// }

// function orderByTitleInvert() {
//   recipesSearched.sort(compareTitleInvert);
//   if (recipesSearched) {
//     setLocalState([...recipesSearched]);
//   } else {
//     console.log("recipesSearched.data NO EXISTE en Invert!");
//     return <div>NO HAY ELEMENTOS PARA RENDERIZAR</div>; //! no funciona
//   }
// }
//!---------------

// function filterByDiet(e) {
//   console.log(e.target.id);

//   let filteredRecipes = recipesSearched.filter((receta) =>
//     callBackFilter(receta, e.target.id)
//   );
//   console.log(filteredRecipes);
//   setLocalState(filteredRecipes);
// }

//! Actions:

// export const getRecipeDetailFIXED = (id) => {
//   return async function (dispatch) {
//     const response = await fetch(`http://localhost:3001/recipes/${id}`);
//     const data = await response.json();
//     dispatch({ type: GET_RECIPE_DETAIL, payload: data });
//   };
// };

// export const getRecipesByTitle = (title) => {
//   return async function (dispatch) {
//     try {
//       console.log("TRY de getRecipesByTitle");
//       let response = await axios.get(
//         `http://localhost:3001/recipes/?title=${title}`
//       );
//       return dispatch({ type: GET_RECIPES, payload: response });
//     } catch (error) {
//       console.log("ERROR AL getRecipesByTitle");
//       return error.message;
//     }
//   };
// };

// export const getRecipesByDiet = (diet) => {
//   return async function (dispatch) {
//     try {
//       console.log("TRY de getRecipesByDiet");
//       let response = await axios.get(
//         `http://localhost:3001/recipes/?diet=${diet}`
//       );
//       return dispatch({ type: GET_RECIPES, payload: response });
//     } catch (error) {
//       console.log("ERROR AL getRecipesBydiet");
//       return error.message;
//     }
//   };
// };

// export const sortByTitle = () => {
//   return function (dispatch) {
//     try {
//       return dispatch({ type: "SORT_BY_TITLE", payload: "" });
//     } catch (error) {
//       return error.message;
//     }
//   };
// };
// //!----------------------------------------

//! REDUCER:

//! Switch  cases:
// case "SORT_BY_TITLE":
//   function compareTitle(a, b) {
//     // a should come before b in the sorted order
//     if (a.title < b.title) {
//       return -1;
//       // a should come after b in the sorted order
//     } else if (a.title > b.title) {
//       return 1;
//       // and and b are the same
//     } else {
//       return 0;
//     }
//   }
//   return {
//     ...state,
//     allFromDB: state.allFromDB.sort(compareTitle),
//   };
// case "DELETE_RECIPE":
//   return {
//     ...state,
//     recipes: state.recipes.filter((recip) => recip.id !== action.payload),
//   };
//!------------------------------
