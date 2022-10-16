"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const recipeRouter = require("./recipe-routes/recipe-routes");
const dietsRouter = require("./diet-routes/diet-routes");
router.use("/recipes", recipeRouter);
router.use("/diets", dietsRouter);
module.exports = router;
