const { Router } = require("express");
const { Diet } = require("../db");
// const Recipe = require("../models/Recipe");

const router = Router();

//  GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá(link)
router.get("/", async (req, res) => {
  try {
    let dietas = await Diet.findAll();
    res.status(200).send(dietas);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// router.post("/", async (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res.status(400).send("Debe ingresar un name para la dieta");
//   }
//   try {
//     let newDieta = await Diet.findOrCreate({
//       where: {
//         name: name,
//       },
//       default: {
//         name: name,
//       },
//     });
//     return res.status(200).send(newDieta);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

router.post("/", async (req, res) => {
  let arrDietas = [];
  console.log(req.body);
  if (!Array.isArray(req.body)) {
    if (!req.body.name) {
      return res.status(388).send("El objeto recibido no tiene un name.");
    }
  }
  try {
    if (req.body.name) {
      let newDiet = await Diet.create(req.body);
      console.log("newDiet creada");
      return res.status(202).send(newDiet);
    }
    arrDietas = req.body;
    for (let i = 0; i < arrDietas.length; i++) {
      let nuevaDieta = await Diet.create(arrDietas[i]);
      console.log(`recién creada dieta con id: ${nuevaDieta.id}`);
    }
    return res.status(210).send("Dietas creadas!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;