// API Key de Spoontacular:
// 08627e517b4943fe9b66893317a91541

const server = require("./api/src/app");

//? DONE En api crear un archivo llamado: .env que tenga la siguiente forma:
// DB_USER=usuariodepostgres
// DB_PASSWORD=passwordDePostgres
// DB_HOST=localhost
// Reemplazar usuariodepostgres y passwordDePostgres con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).
//?-----

//? DONE Crear desde psql una base de datos llamada food.

//* Enunciado
// La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa spoonacular y a partir de ella poder, entre otras cosas:
// Buscar recetas
// Filtrarlos / Ordenarlos
// Crear nuevas recetas propias
//? En cada request al backend voy a tener que chequear si puedo satisfacer la request usando la API, pero tmb chequear en la DB?
//? Ejemplo: Me piden una lista de recetas que tengan que ver con "beef". Tengo que buscar en la API y tmb en la DB? En la DB van a estar únicamente las creadas por el usuario usando un formulario en el front.

//? Podría hacer que la PrimaryKey de mis elementos de mi DB empiece con db. O sea: db02. Al hacer esto podría hacer que se pueda chequear si es de la API o de la DB, y también diferenciar las PK y que no se me mezclen los elementos de la api con los de las db ya que no tendrían el mismo PK.

//*Practicar pasar de async await a promesas, ida y vuelta ;)
//*Pensar bien la estructura de cada app, pensar el rol de cada componente, micro y macro, Detallar y escribir los detalles de cada parte de la app. Esto me va a ayudar a entender bien todo.

//h DONE 1) Crear los models.:
// Base de datos
// El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):
//?Tener presente que no se tienen que mezclar los id de mis instancias en la BD con la de la API de spoontacular.
//? Quizás en vez de buscar que los id de la db sean distintos a los de la API, podría.......?
//  Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Nivel de "comida saludable" (health score)
// Paso a paso

//  Tipo de dieta con las siguientes propiedades: ID, Nombre
//DONE La relación entre ambas entidades debe ser de muchos a muchos.

//h 2) Crear rutas. Cada ruta con su propio archivo adentro de /routes.
//Ojo que acá me van a hacer hacer un fetch a una api, y le voy a pasar a api los detalles que queiren ver. Por ejemplo, si el cliente le hace click a una receta en partícular, en la url va a parecer como query o params el id de esa receta que clickeó. Y al llegar el id de esa receta que el cliente quiere ver en más detalle, yo hago una busqueda del id de esa receta a la API. Si la id empieza con db-188 por ejemplo, voy a hacer la búsqueda en mi DB. Pero si no tiene un db en el id, voy a buscar directamente en la API.
//También puede pasar que no quiera buscar un ID si no algo más general. Entonces voy a tener que enviarle las recetas que están en la API y también las de la DB.
//Tendría que recoger los datos de los dos servidores, concatenarlos y enviarlos al usuario.
//Si pudiese tener una ruta exclusiva para las recetas creadas por el usuario, sería más fácil. Pero no..
//* En el POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//? QUIZÁS ESTO ES SIMPLEMENTE PARA PROBAR QUE PUEDO GUARDAR DATOS EN MI DB. PERO NO QUIEREN QUE COMBINE LAS BÚSQUEDAS.. aunque quizás sí.
//?Podría preguntarle a alguien de Henry para que me diga cómo lo hago.. xq hay diferencia. Aunque quizás por meterle 4 horas más puedo hacerlo yo solo que funcione en ambos casos.
//Podría crear una función que devuelva true || false si un PK es de la DB o de la API. Y dependiendo de este if(funcionEsDB) ir a buscar a un lado u el otro.

//El archivo app.js importa el objeto de rutas y lo usa como middleware, con un server.use(router)

//DONE: 3) Crear Base de Datos con Postgres, SQL Shell. llamada food
//DONE 4) Sincronizar BD con los models. Esto creo que ya se hace automáticamente en el archivo db.js
//h 5) Testear con Postman.

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
