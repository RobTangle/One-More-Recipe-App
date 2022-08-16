const { Router } = require("express");
const { Recipe } = require("../db");
// const Recipe = require("../models/Recipe");
// const { MY_API_KEY } = process.env;
const MI_API_KEY = "08627e517b4943fe9b66893317a91541";
const axios = require("axios");
const { Op } = require("sequelize");

const router = Router();

//!Los request que me llegan los tengo que conectar con la base de datos o mandar a buscar a la api?
//! A la api podría mandar directamente desde el front?

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado:
router.get("/", async (req, res) => {
  const { name } = req.query;
  //! Acá en realidad tengo que pasar por el "where" todas las key-values que me pasan por query.

  if (!name) {
    return res.status(400).send("No recibí un name por query");
  }
  try {
    const busqueda = await Recipe.findAll({
      //h tendría que hacer que incluya en el name la palabra que me llega por query, en vez de buscar exactamente ese name.
      where: { name: name },
    });
    //! después de obtener "busqueda", concatenar con lo que me traiga la API
    console.log(busqueda.length);
    console.log("Soy la busqueda: ", busqueda.toJSON);
    console.log(busqueda[0].dataValues);
    return res.status(200).send(busqueda);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//h-------------------------------
function fromQueryToURL(obj) {
  let urleado = "";
  for (const [key, value] of Object.entries(obj)) {
    urleado += `${key}=${value}&`;
  }
  return urleado;
}
//h------------------------------

//h---probando get para querys:
router.get("/query", async (req, res) => {
  //cómo busco con un "includes" en cada atributo?

  let queryToURL = fromQueryToURL(req.query);

  try {
    // si me envian algo por query:
    if (queryToURL.length >= 2) {
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
      );
      //traer también lo que haya en la DB:
      // let fromDB = [];
      console.log("ENtré al >= 2");
      console.log(queryToURL);
      console.log(
        `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
      );
      return res.status(208).send(axiado.data);
    } else {
      let axiadoSinQuery = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${MI_API_KEY}`
      );
      return res.status(201).send(axiadoSinQuery.data);
    }
  } catch (error) {
    console.log(
      `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}&apiKey=${MI_API_KEY}`
    );
    console.log("ERROR ACÄ!!!: ", error.message);
    return res.send(error.message);
  }
});

//  GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
//? what?!: Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get("/:idReceta", async (req, res) => {
  const idReceta = req.params.idReceta;
  if (!idReceta) {
    return res.status(404).send("Debe ingresar por params el id de la receta");
  }
  try {
    let recetaEncontrada;
    if (idReceta.length > 31) {
      recetaEncontrada = await Recipe.findByPk(idReceta);
    }
    if (!recetaEncontrada) {
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/${idReceta}1/information?apiKey=${MI_API_KEY}`
      );
      console.log("Receta buscada en API");
      return res.status(200).send(axiado.data);
    }
    console.log("Receta buscada en DB");
    return res.status(200).send(recetaEncontrada);
  } catch (error) {
    return res.send(error.message);
  }
});

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

//!---------

// POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//? Cómo relaciono sus tipos de dietas?

router.post("/", async (req, res) => {
  const { name, summary, healthScore } = req.body;
  if (!name || !summary) {
    return res.status(400).send("name and summary are mandatory");
  }
  try {
    //agregar a la db:
    const data = { name, summary, healthScore };
    const newRecipe = await Recipe.create(data);
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(402).send(error.message);
  }
});

// router.post("/", async (req, res) => {
//   const { nombre, ingredientes } = req.body;
//   try {
//     return res
//       .status(233)
//       .send(`nombre es: ${nombre} e ingredientes es: ${ingredientes}`);
//   } catch (error) {
//     return res.error;
//   }
// });

module.exports = router;