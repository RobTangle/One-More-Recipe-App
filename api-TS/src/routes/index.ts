import { Router } from "express";
const router = Router();

const recipeRouter = require("./recipe-routes/recipe-routes");
const dietsRouter = require("./diet-routes/diet-routes");

router.use("/recipes", recipeRouter);
router.use("/diets", dietsRouter);

module.exports = router;
