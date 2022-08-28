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

//* El archivo app.js importa el objeto de rutas y lo usa como middleware, con un server.use(router)

//! PROBLEMAS DETECTADOS PARA SOLUCIONAR:

//! El input del paginado no funciona si lo intento borrar o escribir otro número!!!
//! * Creo que no renderizo bien TODAS las diets de las API (las que estan como propiedades creo que no las renderizo)

//! * El createBulk se saltea las validaciones del Model!!!!! Pero el create() no se saltea la validación del Model! INCREÍBLE! Testeado con mis rutas de postman al mandar por /bulk o mandar por / sólo que hace un array de create(). MUCHO MÁS SEGURO ESTO ÚLTIMO!
//H ITINERARIO: ----------------------------------------------------------------------------------
//h * Terminar validaciones
//h * Solucionar PAGINADO input!!!!
//h * Hacer action para borrar recetas por id mediante sequelize. COPIAR LO QUE YA HICE CON DIETS!
//h * Mover MI_API_KEY al archivo env
//? IDEAS: -----------------------------------------------------------------------------------------

//? 1* Podría hacer un ordenamiento según el readyInMinutes!
//? RANDOM:

//---------------

//-----------------------------
//* PARA LOADING DE RECIPE DETAILS: OK!!!! Terminado y funcionando bien!!!!

//Cuando la persona entra, que se encuentre con un gif de loading.
// Este componente va a estar escuchando al State.RecipeDetails.
//El State.RecipeDetails va a recibir un objeto. Ese objeto puede ser la receta con sus detalles, o un error.
//Si es un error, renderizar el error.
// Si es un objeto que tiene propiedad title, renderizar ese objeto.
// Debería crear un componente llamada RecipeDetailCard, que es lo que va a renderizar si llega una receta. Le paso la receta como props.
//! Al final le envío un objeto que es como una receta, pero con datos onda: Title: "No se encontró la receta", img: IMGdeError.., etc. Lo renderiza como cualquier otra tarjeta.

//! Si !state.RecipeDetail.title, render gif. Si state.RecipeDetail.title existe, renderizá el Componente <RecipeDetailsCard props={recipeDetailsRedux}/> (o algo así las props. Podría dividirla por cada prop que vaya a necesitar la Card y es más facil quizás? O más dificl? jej..)

//* 1)Configurar backend en la ruta de /recipes/:id  que responda con un objeto. Ya sea un objeto {error: "el error que sea"}, o un objeto de una receta.
//* 2) En la action tmb preparo en caso de que dé error y no llegue al back. El Back, si contesta, va a contestar con un objeto sí o sí. Pero si no hay comunicación con el back, la action se va a dar cuenta y le voy a decir que responda con un objeto que tmb sea del tipo error {error: "El problema que hubo"}.
//* Y sea lo que sea que obtenga la action, que lo mande al reducer y el reducer asigna ese payload al State.RecipeDetails.
//* 3) Conseguir gif para que renderice por default al entrar al /home/recipes/234234
//* 4) Crear Componente de RecipeDetailCard que lo voy a renderizar adentro del RecipeDetails. Y a la card le voy a pasar por props el objeto que llegó al State.recipeDetails, en caso de que no sea un {error: "error"}.
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

function dietsToString(diets) {
  let stringed = "";
  diets?.forEach((element) => {
    stringed += `${element} | `;
  });
  return stringed;
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

//! Botones de filtrado que funcionaban joya, pero los reemplacé por un componente que básicamente contiene este mismo código.
{
  /*<div className="filter-order-container" id="filter-order-container">
        <label htmlFor="filterDiets">
          <span>Filter by diet</span>
        </label>

        <div className="filter-buttons">
          <button
            onClick={onFilterOptionChange}
            value="gluten free"
            id="glutenFree"
          >
            Gluten Free
          </button>
          <button
            value="dairyFree"
            id="dairyFree"
            onClick={onFilterOptionChange}
          >
            Dairy Free
          </button>
          <button value="vegan" id="vegan" onClick={onFilterOptionChange}>
            Vegan
          </button>
          <button
            value="vegetarian"
            id="vegetarian"
            onClick={onFilterOptionChange}
          >
            Vegetarian
          </button>
          <button
            value="lacto ovo vegetarian"
            id="lacto-ovo-vegetarian"
            onClick={onFilterOptionChange}
          >
            Lacto ovo vegetarian
          </button>
          <button
            value="pescetarian"
            id="pescetarian"
            onClick={onFilterOptionChange}
          >
            Pescetarian
          </button>
          <button
            value="ketogenic"
            id="ketogenic"
            onClick={onFilterOptionChange}
          >
            Ketogenic
          </button>
          <button value="paleo" id="paleo" onClick={onFilterOptionChange}>
            Paleo
          </button>
          <button value="primal" id="primal" onClick={onFilterOptionChange}>
            Primal
          </button>
          <button
            value="lowFodmap"
            id="low FODMAP"
            onClick={onFilterOptionChange}
          >
            Low FODMAP
          </button>
          <button value="whole30" id="whole30" onClick={onFilterOptionChange}>
            Whole30
          </button>
          <button value="omnivore" id="omnivore" onClick={onFilterOptionChange}>
            Omnivore
          </button>
        </div>

        <button className="reset-filter" onClick={resetFilter}>
          Reset filters
        </button>
      </div> */
}
//!---- En desuso pero guardados por si las dudas.... ---------------------------------

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

//! Rutas de /recipes en desuso:

//*BackUp de ruta que funcionaba bien, pero le faltaba traer a las Recipes de la DB el array de dietas. El resto andaba bien. Y también buscaba por query+diets!! :

//* --- GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Incluir los tipos de dieta asociados (esto ya deberia venir en la data)
//! Esta ruta puede ser pulida..
// router.get("/:idReceta", async (req, res) => {
//   console.log("Entré al get /:idReceta");
//   const idReceta = req.params.idReceta;
//   if (!idReceta) {
//     return res.status(404).send("Debe ingresar por params el id de la receta");
//   }
//   try {
//     let recetaEncontrada;
//     if (idReceta.length > 31) {
//       //(si la PK es UUIDV4):
//       console.log("Buscando recenta en DB: idReceta.length > 31");
//       recetaEncontrada = await Recipe.findByPk(idReceta);
//     }
//     if (!recetaEncontrada) {
//       console.log("Buscando receta en API...");
//       //(si no encuentro la receta en la DB, chequeo la API por si las dudas...:)
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MI_API_KEY}`
//       );
//       console.log("Receta buscada en API");
//       console.log(`Receta title: ${axiado.data?.title}`);
//       return res.status(200).send(axiado.data);
//     }
//     console.log("Devolviendo buscada en DB..:");
//     return res.status(200).send(recetaEncontrada);
//   } catch (error) {
//     console.log(`Error! ${error.message}`);
//     return res.send(error.message);
//   }
// });

//* POST ACTUAL QUE FUNCIONA, pero no perfecto por el tema de las associations.
// router.post("/", async (req, res) => {
//   const { title, summary, healthScore, diet, dietId } = req.body;
//   if (!title || !summary) {
//     console.log("Title o summary no ingresados!");
//     return res.status(400).send("title and summary are mandatory");
//   }
//   try {
//     //agregar a la db:
//     const data = { title, summary, healthScore, diet };
//     console.log(`Entré al TRY: diet: ${diet}; dietId: ${dietId}`);
//     const newRecipe = await Recipe.create(data);
//     if (Array.isArray(dietId) && dietId.length > 0) {
//       console.log(`Entré al Array.isArray(${dietId})`);
//       for (let i = 0; i < dietId.length; i++) {
//         await newRecipe.addDiet(dietId[i]); //! probando setear FK.
//         console.log(`acabo de meter un addDiet con ${dietId[i]}`);
//       }
//     }
//     if (dietId && !Array.isArray(dietId)) {
//       console.log(`Entré al !Array.isArray(${dietId})`);
//       await newRecipe.addDiet(dietId);
//     }
//     //     //! Si dietId fuese un arreglo, directamente le paso todos los id. Tengo que hacer que en el req.body me llegue un key "dietId" = [4, 2, 1, 8].
//     //     //! Y le paso ese array a newRecipe.addDiets(dietId).
//     //     //! Además, debería guardar como atributo diet un string de las dietas. Tengo que hacer esto en este paso. Al crear la instancia nueva de la receta acá.
//     //     //! Podría hacer que se forme el string directamente en el front y se posteen la prop diet ya como un string.... pero quizás sea mejor hacerlo desde acá, o ni siquiera ir por este camino ya que si me modifican la asosiacion entre la receta y la diet, no se me actualizaría  ya que está en forma de string. Debería enviar la prop dietId que tiene el model, y
//     //     //! una vez que recibo esos números en el front, lo renderizo según cada número. ESTA CREO QUE ES LA MEJOR. PROBAR SI RECIBO dietId con muchos números o qué

//     console.log("Receta creada!! newRecipe: ");
//     console.log(`${newRecipe}`);
//     return res.status(201).json(newRecipe);
//   } catch (error) {
//     console.log("Error al intentar crear la receta!!");
//     return res.status(402).send(error.message);
//   }
// });

//* --- POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//? Cómo relaciono sus tipos de dietas?

// router.post("/", async (req, res) => {
//   const { title, summary, healthScore, diet, dietId } = req.body;
//   if (!title || !summary) {
//     console.log("Title o summary no ingresados!");
//     return res.status(400).send("title and summary are mandatory");
//   }
//   try {
//     //agregar a la db:
//     const data = { title, summary, healthScore, diet };
//     const newRecipe = await Recipe.create(data);
//     // await newRecipe.addDiet(dietId); //! probando setear FK.
//     //! Si dietId fuese un arreglo, directamente le paso todos los id. Tengo que hacer que en el req.body me llegue un key "dietId" = [4, 2, 1, 8].
//     //! Y le paso ese array a newRecipe.addDiets(dietId).
//     //! Además, debería guardar como atributo diet un string de las dietas. Tengo que hacer esto en este paso. Al crear la instancia nueva de la receta acá.
//     //! Podría hacer que se forme el string directamente en el front y se posteen la prop diet ya como un string.... pero quizás sea mejor hacerlo desde acá, o ni siquiera ir por este camino ya que si me modifican la asosiacion entre la receta y la diet, no se me actualizaría  ya que está en forma de string. Debería enviar la prop dietId que tiene el model, y
//     //! una vez que recibo esos números en el front, lo renderizo según cada número. ESTA CREO QUE ES LA MEJOR. PROBAR SI RECIBO dietId con muchos números o qué

//     console.log("Receta creada!!");
//     return res.status(201).json(newRecipe);
//   } catch (error) {
//     console.log("Error al intentar crear la receta!!");
//     return res.status(402).send(error.message);
//   }
// });

//* --- GET /recipes?name="...":  CREO QUE FUNCIONA BIEN! LO COMENTO PARA PROBAR LOS EXPERIMENTOS:
//- hacer el get con/sin query con suma de API y DB:

// router.get("/", async (req, res) => {
//   const { query, diet } = req.query;
//   console.log(`Soy query: ${query}`);
//   console.log(`Soy diet: ${diet} y mi .length es: ${diet.length}`);
//   console.log(`Soy el req.query: ${req.query} y mi length es: ${diet.length}`);
//   let queryToURL = fromQueryToURL(req.query);
//   let fromDB = [];
//   let concatAPIyDB = [];
//   console.log("Entré en el get '/'");
//   console.log(`Soy el queryToURL: ${queryToURL}`);
//   console.log(`queryToURL.length: ${queryToURL.length}`);
//   try {
//     // si me envian query y diet válidos...:
//     if (query && query.length > 1 && diet && diet.length > 1) {
//       console.log("ENtré al QUERY y DIET son VÁLIDOS");
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(axiado.data.results);
//       console.log(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       let fromDB = await Recipe.findAll({
//         where: {
//           title: query,
//           diet: diet,
//         },
//       });
//       console.log(fromDB);

//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       console.log(`retornando concatAPIyDB: ${concatAPIyDB}`);
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (query && query.length > 1) {
//       console.log(
//         "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
//       );
//       fromDB = await Recipe.findAll({
//         where: { title: query }, //! hacer que no sea igualación exacta si no mas bien un includes o algo así.
//       });
//       console.log(`Soy fromDB: ${fromDB}`);
//       console.log(`Soy fromDB.length: ${fromDB.length}`);

//       console.log(`Buscar en API..`);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (diet && diet.length > 1) {
//       console.log("Entré al (diet && diet.length > 1)");
//       fromDB = await Recipe.findAll({
//         where: { diet: diet },
//       });
//       console.log(`Soy fromDB: ${fromDB}`);

//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     } else {
//       console.log(
//         `Entro al else final si no me ingresan title ni diet o son de 1 caracter... `
//       );
//       fromDB = await Recipe.findAll();
//       console.log(`fromDB.length: ${fromDB.length} `);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(`axiado.data.length: ${axiado.data.results.length}`);
//       if (axiado.data.results?.length >= 1) {
//         console.log(`Entré al axiado.data.results?.length >= 1`);
//         concatAPIyDB = [...fromDB, ...axiado.data.results];
//         console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//         return res.status(203).send(concatAPIyDB);
//       } else {
//         concatAPIyDB = [...fromDB];
//       }
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       return res.status(204).send(concatAPIyDB);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });
//!---- EL DE ARRIBA CREO QUE ANDA "BIEN". Lo comenté para probar los nuevos experimentos.

//*-- EXPERIMENTACIÓN ---------------------------------------------------------------------------
//! ESTE GET LO COMENTO PARA PROBAR EL DE ARRIBA MODULARIZADO. ESTE DE ABAJO ES EXPERIMENTAL PERO PODRÍA ANDAR BIEN ASI COMO ESTA....
// router.get("/", async (req, res) => {
//   const { query, diet } = req.query;
//   console.log(`Soy query: ${query}`);
//   console.log(`Soy diet: ${diet} y mi .length es: ${diet.length}`);
//   console.log(`Soy el req.query: ${req.query} y mi length es: ${diet.length}`);
//   let queryToURL = fromQueryToURL(req.query);
//   let fromDB = [];
//   let concatAPIyDB = [];
//   console.log("Entré en el get '/'");
//   console.log(`Soy el queryToURL: ${queryToURL}`);
//   console.log(`queryToURL.length: ${queryToURL.length}`);
//   try {
//     // si me envian query y diet válidos...:
//     if (query && query.length > 1 && diet && diet.length > 1) {
//       console.log("ENtré al QUERY y DIET son VÁLIDOS");
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(axiado.data.results);
//       // let fromDB = await Recipe.findAll({
//       //   where: {
//       //     title: query,
//       //     diet: diet,
//       //   },
//       // });
//       // console.log(fromDB);
//       //!----
//       // let filteredByName = getByTitleFromDB(query);
//       // console.log("filteredByName: " + filteredByName);
//       //!----
//       const dBRecipes = await Recipe.findAll({
//         where: {
//           title: {
//             [Op.iLike]: `%${query}%`,
//           },
//         },
//         include: Diet,
//       });
//       let dBRecipesPlusDiets = dBRecipes.map((recipe) => {
//         return {
//           id: recipe.id,
//           title:
//             recipe.title.trim().toLowerCase().charAt(0).toUpperCase() +
//             recipe.title.substring(1),
//           healthScore: recipe.healthScore,
//           summary: recipe.summary,
//           steps: recipe.steps,
//           diets: recipe.Diet.map((d) => d.name),
//         };
//       });
//       console.log(`dBRecipesPlusDiets.length = ${dBRecipesPlusDiets.length}`);
//       console.log(dBRecipesPlusDiets);

//       let filteredPlusDiets = dBRecipesPlusDiets.filter((r) =>
//         r.diets.includes(diet)
//       );
//       console.log(`filteredPlusDiets.length = ${filteredPlusDiets.length}`);
//       // console.log(filteredPlusDiets);
//       concatAPIyDB = [...filteredPlusDiets, ...axiado.data.results];
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       console.log(`retornando concatAPIyDB: ${concatAPIyDB}`);
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (query && query.length > 1) {
//       console.log(
//         "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
//       );
//       //! Acá tendría que usar un includes o algo así...:
//       let filteredByName = getByTitleFromDB(query);

//       // fromDB = await Recipe.findAll({
//       //   where: { title: query },
//       // });
//       // console.log(`Soy fromDB: ${fromDB}`);
//       // console.log(`Soy fromDB.length: ${fromDB.length}`);

//       console.log(`Buscar en API..`);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...filteredByName, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (diet && diet.length > 1) {
//       //! Acá tengo que buscar por pks en tabla relacional?
//       console.log("Entré al (diet && diet.length > 1)");
//       fromDB = await Recipe.findAll({
//         where: { diet: diet },
//       });
//       console.log(`Soy fromDB: ${fromDB}`);

//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     } else {
//       console.log(
//         `Entro al else final si no me ingresan title ni diet o son de 1 caracter... `
//       );
//       fromDB = await Recipe.findAll();
//       console.log(`fromDB.length: ${fromDB.length} `);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(`axiado.data.length: ${axiado.data.results.length}`);
//       if (axiado.data.results?.length >= 1) {
//         console.log(`Entré al axiado.data.results?.length >= 1`);
//         concatAPIyDB = [...fromDB, ...axiado.data.results];
//         console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//         return res.status(203).send(concatAPIyDB);
//       } else {
//         concatAPIyDB = [...fromDB];
//       }
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       return res.status(204).send(concatAPIyDB);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });
//! -- EL DE ARRIBA PODRÍA FUNCIONAR AUNQUE ESTÁ EN ETAPA DE MODIFICACION EXPERIMENTAL.
//*-----------------------------------------------------------------
//!CÓDIGO QUE NO SIRVE PERO DEJO LOS BACKUPS: ------------------------------------------------------------------------

//*----- hacer el get con/sin query con suma de API y DB:
// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado:
//cómo busco con un "includes" en cada atributo? Con el Op.
//h Acá faltaría el "Si no existe ninguna receta mostrar un mensaje adecuado".
//h Setear por default a number=99 para que me traiga más de 9 resultados
// router.get("/", async (req, res) => {
//   const { query, diet } = req.query;
//   console.log(`Soy query: ${query}`);
//   console.log(`Soy diet: ${diet}`);
//   console.log(`Soy el req.query: ${req.query}`);
//   let queryToURL = fromQueryToURL(req.query);
//   let fromDB = [];
//   let concatAPIyDB = [];
//   console.log("Entré en el get '/'");
//   console.log(`Soy el queryToURL: ${queryToURL}`);
//   console.log(`queryToURL.length: ${queryToURL.length}`);
//   try {
//     // si me envian algo por query:
//     if (queryToURL.length >= 2) {
//       console.log("ENtré al >= 2");
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );

//       console.log(queryToURL);
//       console.log(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       //! Esto de acá abajo es para que no me choque la prop query en la DB, ya que no existe query en el Model Receta:
//       if (query && query.length > 1) {
//         console.log(
//           "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
//         );
//         fromDB = await Recipe.findAll({
//           where: { title: req.query.query },
//         });
//       } else {
//         console.log("Entré al else (req.query.query no existe)");
//         if (diet && diet.length > 3) {
//           console.log("Si req.query.diet existe...y su length es mayor a 3");
//           fromDB = await Recipe.findAll({
//             where: { diet: diet },
//           });
//         }
//       }

//       //!----------------------------
//       //traer también lo que haya en la DB:
//       console.log(`Soy ASD: req.query.query: ${req.query.query}`);

//       console.log("Length the fromDB: ", fromDB.length);
//       // let fromDBFiltered = fromDB.filter(
//       //   (recipe) => recipe.title == req.query?.query
//       // );
//       console.log("Soy el largo del fromDB: ", fromDB.length);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(208).send(concatAPIyDB);
//     } else {
//       console.log("Entré en el try else del get '/' length < 2");
//       let axiadoSinQuery = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`
//       );
//       fromDB = await Recipe.findAll();

//       concatAPIyDB = [...fromDB, ...axiadoSinQuery.data.results];
//       return res.status(201).send(concatAPIyDB);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });

//h---probando get para querys: ANDA JOYA CON LA API NADA MÁS!!!!!!:
// router.get("/query", async (req, res) => {
//   //cómo busco con un "includes" en cada atributo?

//   let queryToURL = fromQueryToURL(req.query);
//   // let fromDB = [];
//   try {
//     // si me envian algo por query:
//     if (queryToURL.length >= 2) {
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
//       );

//       console.log("ENtré al >= 2");
//       console.log(queryToURL);
//       console.log(
//         `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       //traer también lo que haya en la DB:
//       // let fromDB = [];

//       return res.status(208).send(axiado.data);
//     } else {
//       let axiadoSinQuery = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${MI_API_KEY}`
//       );
//       return res.status(201).send(axiadoSinQuery.data);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}&apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });
//h-----------lo de arriba anda bien para lo que está hecho!---------------------------------------

// router.get("/", async (req, res) => {
//   const { name } = req.query;
//   //! Acá en realidad tengo que pasar por el "where" todas las key-values que me pasan por query.
//   if (!name) {
//     return res.status(400).send("No recibí un name por query");
//   }
//   try {
//     const busqueda = await Recipe.findAll({
//       //h tendría que hacer que incluya en el name la palabra que me llega por query, en vez de buscar exactamente ese name.
//       where: { name: name },
//     });
//     //! después de obtener "busqueda", concatenar con lo que me traiga la API
//     console.log(busqueda.length);
//     console.log("Soy la busqueda: ", busqueda.toJSON);
//     console.log(busqueda[0].dataValues);
//     return res.status(200).send(busqueda);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

//!----prueba con axios a la API ----:
// router.get("/:idReceta", async (req, res) => {
//   const idReceta = req.params.idReceta;
//   try {
//     const axiado = await axios.get(
//       `https://api.spoonacular.com/recipes/${idReceta}1/information?apiKey=${MI_API_KEY}`
//     );
//     if (axiado.status >= 400) {
//       //revisar DB?
//     }
//     // console.log(axiado.data);
//     return res.status(200).send(axiado.data);
//   } catch (error) {
//     console.log(error.message);
//     res.status(401).send("Error en el get!!!!");
//   }
// });
