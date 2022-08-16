const { Router } = require("express");
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recetaRouter = require("./recipes");
const dietsRouter = require("./diets");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recetaRouter);
router.use("/diets", dietsRouter);

//!---- rutas de prueba: ------
// router.get("/", async (req, res) => {
//   res.status(255).send({ hola: "Hello!!!!" });
// });

// router.get("/", async (req, res) => {
// });

router.post("/postear", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .send(`name or description missing: ${name} y ${description}`);
  }
  return res.status(299).send(`OK. Recibidos ${name} y ${description}`);
});
//!-----------------------------

module.exports = router;
