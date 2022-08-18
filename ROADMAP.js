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

//* Podría crear una función que devuelva true || false si un PK es de la DB o de la API. Y dependiendo de este if(funcionEsDB) ir a buscar a un lado u el otro.

//H ITINERARIO: ----------------------------------------------------------------------------------
//h  PODRÍA CREAR UN COMPONENTE QUE SEA UNA TARJETA PARA CADA RECETA. Y le paso por props para propiedad

//? IDEAS: -----------------------------------------------------------------------------------------
//? 1* Para agregar las dietas podría usar el método add que me brinda sequelize cuando hago asociasiones. Le paso un array de Pks de dietas? Podría agregar esas PK a un arreglo y enviarlo en el post.
//? 2*
//? 3*
//? RANDOM:
//? Podría hacer que la PrimaryKey de mis elementos de mi DB empiece con db. O sea: db02. LO HICE DE OTRA FORMA AL FINAL.

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
