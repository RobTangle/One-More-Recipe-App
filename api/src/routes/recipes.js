const { Router } = require("express");
const { Recipe } = require("../db");
// const Recipe = require("../models/Recipe");
// const { MY_API_KEY } = process.env;
const MI_API_KEY = "08627e517b4943fe9b66893317a91541";
const axios = require("axios");
const { Op } = require("sequelize");

const router = Router();

//h-------------------------------
function fromQueryToURL(obj) {
  let urleado = "";
  for (const [key, value] of Object.entries(obj)) {
    urleado += `${key}=${value}&`;
  }
  return urleado;
}
//h------------------------------

//*----- hacer el get con/sin query con suma de API y DB:
// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado:
//cómo busco con un "includes" en cada atributo? Con el Op.
//h Acá faltaría el "Si no existe ninguna receta mostrar un mensaje adecuado".
router.get("/", async (req, res) => {
  let queryToURL = fromQueryToURL(req.query);
  let fromDB = [];
  let concatAPIyDB = [];
  try {
    // si me envian algo por query:
    if (queryToURL.length >= 2) {
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
      );

      console.log("ENtré al >= 2");
      console.log(queryToURL);
      console.log(
        `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
      );
      //traer también lo que haya en la DB:
      fromDB = await Recipe.findAll({
        where: req.query,
      });
      console.log(fromDB);
      concatAPIyDB = [...fromDB, ...axiado.data.results];
      return res.status(208).send(concatAPIyDB);
    } else {
      let axiadoSinQuery = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${MI_API_KEY}`
      );
      fromDB = await Recipe.findAll();
      concatAPIyDB = [...fromDB, ...axiadoSinQuery.data.results];
      return res.status(201).send(concatAPIyDB);
    }
  } catch (error) {
    console.log(
      `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
    );
    console.log("ERROR ACÄ!!!: ", error.message);
    return res.send(error.message);
  }
});

//*---------------------------------------------------------------------

//  GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
//? what?!: Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados (esto ya deberia venir en la data)
router.get("/:idReceta", async (req, res) => {
  const idReceta = req.params.idReceta;
  if (!idReceta) {
    return res.status(404).send("Debe ingresar por params el id de la receta");
  }
  try {
    let recetaEncontrada;
    if (idReceta.length > 31) {
      //(si la PK es UUIDV4):
      console.log("Buscando recenta en DB: idReceta.length > 31");
      recetaEncontrada = await Recipe.findByPk(idReceta);
    }
    if (!recetaEncontrada) {
      //(si no encuentro la receta en la DB, chequeo la API por si las dudas...:)
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MI_API_KEY}`
      );
      console.log("Receta buscada en API");
      return res.status(200).send(axiado.data);
    }
    console.log("Devolviendo buscada en DB..:");
    return res.status(200).send(recetaEncontrada);
  } catch (error) {
    return res.send(error.message);
  }
});

// POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//? Cómo relaciono sus tipos de dietas?

router.post("/", async (req, res) => {
  const { title, summary, healthScore, diet } = req.body;
  if (!title || !summary) {
    return res.status(400).send("title and summary are mandatory");
  }
  try {
    //agregar a la db:
    const data = { title, summary, healthScore, diet };
    const newRecipe = await Recipe.create(data);
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(402).send(error.message);
  }
});

module.exports = router;

//---------------------------------------------------------------------------------------------------------------------------------
//!CÓDIGO QUE NO SIRVE PERO DEJO LOS BACKUPS: ------------------------------------------------------------------------

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
