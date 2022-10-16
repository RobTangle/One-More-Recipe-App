"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { MI_API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const express_1 = require("express");
const router = (0, express_1.Router)();
const recipe_AuxFns_1 = require("../../auxiliaryFns/recipe-AuxFns");
const recipe_r_fns_1 = require("./recipe-r-fns");
const models_1 = __importDefault(require("../../models"));
const addRecipeInfoTrue = "addRecipeInformation=true";
const NUMBER = "number=20";
// -------- ROUTES : ----------------------------
//* POST
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré al post");
    const { title, summary, healthScore, diets, steps, image } = req.body;
    console.log(`Title: ${title}`);
    try {
        // --- VALIDACIONES:
        if (!title || !summary) {
            return res
                .status(400)
                .send({ error: "title and summary are mandatory." });
        }
        if (title.length > 100 || title.length < 1) {
            return res.status(400).send({
                error: `Title length must be between 1 and 100 characters. It has ${title.length}.`,
            });
        }
        if ((0, recipe_AuxFns_1.userIntroducedProhibitedSimbols)(title)) {
            return res
                .status(400)
                .send({ error: `The title has prohibited simbols.` });
        }
        if (summary.length > 500 || summary.length < 1) {
            return res.status(400).send({
                error: `Summary has ${summary.length} characters. Max: 500, Min: 1`,
            });
        }
        if ((0, recipe_AuxFns_1.userIntroducedProhibitedSimbols)(summary)) {
            return res.status(400).send({
                error: `Summary has prohibited simbols.`,
            });
        }
        if (healthScore) {
            if (typeof healthScore !== "number") {
                return res.status(400).send({
                    error: `HealthScore must be a number.`,
                });
            }
            if (healthScore > 100 || healthScore < 0) {
                return res.status(400).send({
                    error: `Health score ${healthScore}must be between 0 and 100.`,
                });
            }
        }
        if (steps && steps.length > 3000) {
            return res.status(400).send({
                error: `Steps exceeded the maximum 3000 characters. Actual length: ${steps.length}`,
            });
        }
        // --- FIN VALIDACIONES ---
        let newRecipe = yield models_1.default.Recipe.create({
            title: title.toLowerCase(),
            summary,
            healthScore,
            steps,
            image,
        });
        let dietsToSet = yield models_1.default.Diet.findAll({
            where: { name: diets },
        });
        console.log("dietsToSet: " + dietsToSet);
        newRecipe.addDiets(dietsToSet);
        console.log("Nueva receta creada!");
        return res.status(200).send(newRecipe);
    }
    catch (error) {
        console.log(error.message);
        return res.status(404).send({ error: error.message });
    }
}));
//*----------------------------------------------------------------
//* GET BY ID:
router.get("/:idReceta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { idReceta } = req.params;
    console.log(req.params);
    console.log(typeof idReceta);
    console.log("idReceta: ", idReceta);
    //creo objeto para responder en caso de error:
    let errorObject = {
        title: "Recipe not found",
        summary: "Nothing to show here...",
        healthScore: 0,
        steps: [],
        dishTypes: [],
        image: "https://clipground.com/images/avoid-junk-food-clipart-7.jpg",
        diets: ["null"],
        error: "Recipe not found",
    };
    // console.log("errorObject :", errorObject);
    try {
        if (idReceta.length > 30) {
            let recipeDB = yield models_1.default.Recipe.findByPk(idReceta, {
                include: {
                    model: models_1.default.Diet,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            if (recipeDB) {
                let recipeObject = {
                    title: recipeDB.title,
                    id: recipeDB.id,
                    summary: recipeDB.summary,
                    healthScore: recipeDB.healthScore,
                    steps: recipeDB.steps,
                    image: recipeDB.image,
                    diets: recipeDB === null || recipeDB === void 0 ? void 0 : recipeDB.diets.map((diet) => diet.name),
                };
                return res.status(200).send(recipeObject);
            }
            else {
                return res.status(400).send(errorObject);
            }
        }
        else {
            console.log(`Buscar en API con id: ${idReceta}`);
            let axiado = yield axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MI_API_KEY}`).data;
            let axiData = axiado;
            console.log("Receta buscada en API");
            console.log(`Receta title: ${axiData === null || axiData === void 0 ? void 0 : axiData.title}`);
            let axiadoDetails = {
                id: axiData.id,
                title: axiData.title,
                vegetarian: axiData.vegetarian,
                vegan: axiData.vegan,
                glutenFree: axiData.glutenFree,
                dairyFree: axiData.dairyFree,
                lowFodmap: axiData.lowFodmap,
                healthScore: axiData.healthScore,
                summary: axiData.summary,
                dishTypes: axiData.dishTypes,
                image: axiData.image,
                readyInMinutes: axiData.readyInMinutes,
                steps: (_a = axiData.analyzedInstruction[0]) === null || _a === void 0 ? void 0 : _a.steps,
                diets: axiData.diets,
            };
            return res.status(200).send(axiadoDetails);
        }
    }
    catch (error) {
        console.log(`Hubo un error en el catch final del get por ID`);
        errorObject.summary = error.message;
        errorObject.error = error.message;
        console.log(error.message);
        return res.status(404).send(errorObject);
    }
}));
// GET BY QUERY TITLE
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    console.log(`Entré al get. query = ${query}`);
    try {
        if (query) {
            let fromDB = yield (0, recipe_r_fns_1.getByTitleFromDB)(query);
            let fromAPI = yield (0, recipe_r_fns_1.getByTitleFromAPI)(query);
            // let allConcat = fromDB.concat(fromAPI);
            let allConcat = [...fromDB, ...fromAPI];
            return res.status(200).send(allConcat);
        }
        else {
            console.log("Buscando allGlobal...");
            let allGlobal = yield (0, recipe_r_fns_1.getAllGlobal)();
            console.log(`allGlobal.length = ${allGlobal.length}`);
            return res.status(200).send(allGlobal);
        }
    }
    catch (error) {
        let errorObject = {
            title: `There was an error! :( ERROR: ${error.message}`,
            summary: `ERROR: ${error.message}. Try checking your internet connection.`,
            healthScore: 0,
            steps: [],
            dishTypes: ["null"],
            image: "https://clipground.com/images/avoid-junk-food-clipart-7.jpg",
            diets: ["null"],
            error: error.message,
        };
        console.log("Error en el get");
        console.log(error.message);
        return res.status(404).send(errorObject);
    }
}));
//* --- GET ALL FROM DB:
router.get("/getAllFromDB", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré a /getAllFromDB");
    try {
        let recetasFromDB = yield models_1.default.Recipe.findAll();
        res.status(200).send(recetasFromDB);
    }
    catch (error) {
        console.log("Error en getAllFromDB!");
        console.log(error.message);
        res.status(402).send(error.message);
    }
}));
// Comentario para adaptar a query por title y/o diet:
//Para poder hacer busqueda por title y por diet, tengo que agregar una función que busque en la DB por diet. Porque por la API sólo tengo que agregar ese string a la URL y listo.
// Pero para la DB tengo que hacer un filtro adicional chequeando en diets después de agregar esa propiedad a el objeto. ES FÁCIL!!!!
//  en el get, if (query && diet) hacer busquedas con funcion getByTitleDietFrom DB/API, y if (diet) hacer bisquedas con funciongetByDietFrom DB/API.
// Podría incluso modularizarlas más como hice con las de ordenamiento y filter en react.
//----------------------------------
module.exports = router;
