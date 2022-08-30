const { Router } = require("express");
const { Diet } = require("../db");
const { Op } = require("sequelize");
const router = Router();

//  GET /diets:
router.get("/", async (req, res) => {
  try {
    let dietas = await Diet.findAll();
    res.status(200).send(dietas);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

//* Esta ruta acepta un objeto con key name, o un array de objetos.
router.post("/", async (req, res) => {
  let arrDietas = [];
  let dietsCreated = [];
  console.log(req.body);
  try {
    if (!Array.isArray(req.body)) {
      if (!req.body.name) {
        return res
          .status(400)
          .send({ error: "El objeto recibido no tiene un name." });
      }
    }
    // Si es un objeto lo que se postea:
    if (req.body.name) {
      //!--- probando findOrCreate:
      let newDiet = await Diet.findOrCreate({
        where: { name: req.body.name },
      });
      if (newDiet[1]) {
        dietsCreated.push(newDiet[0]);
      }
      return res.status(202).send({
        msg: `Cantidad de dietas creadas: ${dietsCreated?.length}`,
        payload: dietsCreated,
      });
      //! -----fin prueba -----
      // let newDiet = await Diet.create(req.body);
      // console.log("newDiet creada");
      // return res.status(202).send(newDiet)
    }

    // Si es un array lo que se postea:
    if (Array.isArray(req.body)) {
      arrDietas = req.body;
      for (let i = 0; i < arrDietas.length; i++) {
        //!--- probando findOrCreate:
        let newDiet = await Diet.findOrCreate({
          where: { name: arrDietas[i].name },
        });
        if (newDiet[1]) {
          dietsCreated.push(newDiet[0]);
        }
        //! --- fin prueba ------
        // let newDiet = await Diet.create(arrDietas[i]);
        // dietsCreated.push(newDiet);
      }
      return res.status(210).send({
        msg: `Cantidad de dietas creadas: ${dietsCreated?.length}`,
        payload: dietsCreated,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ error: error.message, dietsCreated: dietsCreated });
  }
});

router.put("/destroyByName", async (req, res) => {
  try {
    if (req.body.name === undefined) {
      return res.status(400).send({ error: "name of the diet is mandatory" });
    } else {
      let numberOfdietsDestroyed = await Diet.destroy({
        where: { name: req.body.name },
      });
      return res.status(200).send({
        msg: `Diets destroyed: ${numberOfdietsDestroyed}`,
        numberDestroyed: numberOfdietsDestroyed,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put("/destroyById", async function (req, res) {
  try {
    if (req.body.id === undefined) {
      return res.status(400).send({ error: `undefined ID received.` });
    } else {
      let numberOfdietsDestroyed = await Diet.destroy({
        where: {
          id: req.body.id,
        },
      });
      return res.status(200).send({
        msg: `Diets destroyed: ${numberOfdietsDestroyed}`,
        numberDestroyed: numberOfdietsDestroyed,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put("/gtID", async (req, res) => {
  try {
    if (req.body.limit === undefined) {
      return res.status(400).send({ error: `limit is undefined` });
    } else {
      let numberOfdietsDestroyed = await Diet.destroy({
        where: {
          id: {
            [Op.gt]: req.body.limit,
          },
        },
      });
      return res.status(200).send({
        msg: `Diets destroyed: ${numberOfdietsDestroyed}`,
        numberDestroyed: numberOfdietsDestroyed,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

//! El bulk se pasa por arriba las validaciones del Model si no le agrego un "validate"!
//!----------------------------------------

module.exports = router;
