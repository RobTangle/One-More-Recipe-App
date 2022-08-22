// API Key de Spoontacular:
// 08627e517b4943fe9b66893317a91541
// const server = require("./api/src/app");  Y ESTO POR QUÉ LO TENGO ACÁ? JAJAJ

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
//! * Home/ Cuando busco con By title: Search. me devuelve .... TODO LO DE LA DB y además resultados de API.
//! * Home/ Cuando busco con "Search title and diet" me devuelve... sólo resultados de la API.
//! Podría hacer un slice de State.recipes y renderizar de a tramos de (i, i+9) por ejemplo...
//! * Order by title no funciona. Sólo el Invert funciona.
//! * Si no hay recetas para renderizar, renderizar un mensaje.
//! * Order by Health score INVERT funciona bien. Pero "Order by Health score" está trabajando sobre el store.recipes y no sobre el localState.
//! Cuando ya hay una Recipe detail cargada, tarda mucho en renderizarmela
//H ITINERARIO: ----------------------------------------------------------------------------------
//h OK Sacar los botones de buscado por title y receta individualmente y dejar uno solo.
//h Poner un botón para eliminar filter por dieta, y que simplemente renderice todo el store.recipes.
//h * Filtrar por tipo de dieta. Le hacer un filter al State.Recipes según si el array de diets includes "dieta";
//h * Hacer que el get me traiga 99 recetas. Y hacer que sólo renderice las primeras 9 por cada página. Pensar bien cómo hacer esto... splices? slices? contador en el mapeo?
//h * Pensar cómo establecer la cantidad de páginas que hay. Si está apretado el botón 2, podría decir que me renderice del 10 al 19, por ejemplo. Y que se creen botones según la cantidad de elementos haya en el array. State.recipes.length / 9;
//? IDEAS: -----------------------------------------------------------------------------------------
//? 1* Para agregar las dietas podría usar el método add que me brinda sequelize cuando hago asociaciones. Le paso un array de Pks de dietas? Podría agregar esas PK a un arreglo y enviarlo en el post.
//? 2* Podría hacer que las recetas que me traigo de la DB vayan a un State.DBRecipes y que esas recetas se rendericen a su propia manera ya que no tienen imagen, etc.
//? 3* Para mostrar las diets: Podría hacer que al crear receta en la DB, que diets sea un string con dietas separadas por coma. Y luego desde la tarjeta le hago un split (",") y mapeo cada elemento como una <li>{diet}</li>.
//?
//? RANDOM:

//?--------------------------------------------------------

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
