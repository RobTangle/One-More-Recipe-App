// API Key de Spoontacular:
// 08627e517b4943fe9b66893317a91541

const server = require("./api/src/app");

//? En api crear un archivo llamado: .env que tenga la siguiente forma:
// DB_USER=usuariodepostgres
// DB_PASSWORD=passwordDePostgres
// DB_HOST=localhost
// Reemplazar usuariodepostgres y passwordDePostgres con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).
//?-----

//? Crear desde psql una base de datos llamada food.

// El contenido de client fue creado usando: Create React App.

//*Pensar bien la estructura de cada app, pensar el rol de cada componente, micro y macro, Detallar y escribir los detalles de cada parte de la app. Esto me va a ayudar a entender bien todo.
//h 1) Crear los models.

//h 2) Crear rutas. Cada ruta con su propio archivo adentro de /routes.
//h El archivo app.js importa el objeto de rutas y lo usa  como middleware o algo así, con un server.use(router)

//h 3) Crear Base de Datos con Postgres, SQL Shell. llamada food

//h 4) Sincronizar BD con los models. Esto creo que ya se hace automáticamente en el archivo db.js

//h 5) Testear con Postman.
