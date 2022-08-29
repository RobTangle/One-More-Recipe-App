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

module.exports = router;
