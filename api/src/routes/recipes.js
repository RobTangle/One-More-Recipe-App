const { Router } = require("express");
const { Recipe } = require("../db");
// const Recipe = require("../models/Recipe");

const router = Router();

//!Los request que me llegan los tengo que conectar con la base de datos o mandar a buscar a la api?
//! A la api podría mandar directamente desde el front?

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado:
router.get("/", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send("No recibí un name por query");
  }
  try {
    const busqueda = await Recipe.findAll({
      //h tendrías que hacer que incluya en el name la palabra que me llega por query, en vez de buscar exactamente ese name.
      where: { name: name },
    });
    console.log(busqueda.length);
    console.log("Soy la busqueda: ", busqueda.toJSON);
    console.log(busqueda[0].dataValues);
    return res.status(200).send(busqueda);
  } catch (error) {
    res.status(404).send(error.message);
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
    let recetaEncontrada = await Recipe.findByPk(idReceta);
    if (recetaEncontrada === null) {
      return res.status(399).send("No se encontró ninguna receta con ese id");
    }
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
