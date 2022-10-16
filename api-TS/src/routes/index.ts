import { Router } from "express";
const router = Router();

const recetaRouter = require("./recipes");
const dietsRouter = require("./diets");

router.use("/recipes", recetaRouter);
router.use("/diets", dietsRouter);

module.exports = router;
