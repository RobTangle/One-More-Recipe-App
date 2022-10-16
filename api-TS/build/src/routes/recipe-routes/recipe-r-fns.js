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
exports.getAllGlobal = exports.getAllFromAPI = exports.getAllFromDB = exports.getByTitleFromDB = exports.getByTitleFromAPI = exports.userIntroducedProhibitedSimbols = void 0;
const models_1 = __importDefault(require("../../models"));
const { MI_API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const addRecipeInfoTrue = "addRecipeInformation=true";
const NUMBER = "number=100";
//FUNCIONES AUXILIARES RE RECIPE-ROUTE:
function userIntroducedProhibitedSimbols(inputString) {
    let charactersNotAllowed = /[^{};@>!<]*$/g;
    // /[^<;>@}{!]*$/g;
    if (inputString.search(charactersNotAllowed) !== 0) {
        console.log("ENTRË al !== 0 del USERiNTRODUCEDpHOsIMBOLS");
        return true;
    }
    else {
        return false;
    }
}
exports.userIntroducedProhibitedSimbols = userIntroducedProhibitedSimbols;
// function fromQueryToURL(obj) {
//   let urleado = "";
//   for (const [key, value] of Object.entries(obj)) {
//     urleado += `${key}=${value}&`;
//   }
//   return urleado;
// }
const getByTitleFromAPI = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const axiosFromApi = yield axios.get(`https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&query=${title}&${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`);
        const axiosDataResults = axiosFromApi.data.results;
        console.log(`getByTitleFromAPI. title = ${title}`);
        if (axiosDataResults.length > 0) {
            let recipesFromAPI = yield axiosDataResults.map((r) => {
                var _a;
                return {
                    id: r.id,
                    title: r.title,
                    vegetarian: r.vegetarian,
                    vegan: r.vegan,
                    glutenFree: r.glutenFree,
                    dairyFree: r.dairyFree,
                    lowFodmap: r.lowFodmap,
                    healthScore: r.healthScore,
                    summary: r.summary,
                    dishTypes: r.dishTypes,
                    image: r.image,
                    readyInMinutes: r.readyInMinutes,
                    // steps: r.analyzedInstructions,
                    // steps: r.analyzedInstructions?.[0]?.steps, //Atención a este ?.chain!
                    diets: (_a = r.diets) === null || _a === void 0 ? void 0 : _a.map((diet) => diet),
                };
            });
            console.log(`recipesFromAPI.length = ${recipesFromAPI.length}`);
            return recipesFromAPI;
        }
        else {
            console.log("No se encontró nada en API al parecer. Retorno un arreglo vacío");
            return [];
        }
    }
    catch (error) {
        console.log("Error en getByTitleFromAPI");
        console.log(error.message);
        return [];
    }
});
exports.getByTitleFromAPI = getByTitleFromAPI;
const getByTitleFromDB = (title) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré al getByTitleFromDB");
    console.log(`title = ${title}`);
    try {
        let allFromDB = yield models_1.default.Recipe.findAll({
            include: {
                model: models_1.default.Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        console.log(`allFromDB.length = ${allFromDB.length}`);
        // console.log(allFromDB);
        // me aseguro que la palabra a buscar está en minúscula ya que en la DB guardo los title en todo minúscula:
        let titleLowerCase = title.toLowerCase();
        let allFromDBFilteredByTitle = allFromDB.filter((recipe) => recipe.title.includes(titleLowerCase));
        console.log(`allFromDBFilteredByTitle.length = ${allFromDBFilteredByTitle.length}`);
        let allFromDBFilteredPlusDiets = allFromDBFilteredByTitle === null || allFromDBFilteredByTitle === void 0 ? void 0 : allFromDBFilteredByTitle.map((recipe) => {
            var _a;
            return {
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                steps: recipe.steps,
                image: recipe.image,
                diets: (_a = recipe.diets) === null || _a === void 0 ? void 0 : _a.map((diet) => diet.name),
            };
        });
        console.log(`allFromDBFilteredPlusDiets.length = ${allFromDBFilteredPlusDiets.length}`);
        // let filteredByTitle = allFromDB.filter((recipe) =>
        //   recipe.title.includes(title)
        // );
        // console.log(`filteredByTitle.length = ${filteredByTitle.length}`);
        return allFromDBFilteredPlusDiets;
    }
    catch (error) {
        console.log("Error en getByTitleFromDB");
        console.log(error.message);
        return [];
    }
});
exports.getByTitleFromDB = getByTitleFromDB;
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipesDB = yield models_1.default.Recipe.findAll({
            include: {
                model: models_1.default.Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        let recipesDBPlusDiets = recipesDB === null || recipesDB === void 0 ? void 0 : recipesDB.map((recipe) => {
            var _a;
            return {
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                steps: recipe.steps,
                image: recipe.image,
                diets: (_a = recipe.diets) === null || _a === void 0 ? void 0 : _a.map((diet) => diet.name),
            };
        });
        return recipesDBPlusDiets;
    }
    catch (error) {
        console.log("Error en getAllFromDB");
        console.log(error.message);
        return [];
    }
});
exports.getAllFromDB = getAllFromDB;
const getAllFromAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("Entré al getAllFromAPI");
        const axiosFromApi = yield axios.get(`https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`);
        // console.log(axiosFromApi.data);
        const axiosData = (_a = axiosFromApi.data) === null || _a === void 0 ? void 0 : _a.results;
        if (axiosData.length > 0) {
            let recipesFromAPI = yield axiosData.map((r) => {
                var _a;
                return {
                    id: r.id,
                    title: r.title,
                    vegetarian: r.vegetarian,
                    vegan: r.vegan,
                    glutenFree: r.glutenFree,
                    dairyFree: r.dairyFree,
                    healthScore: r.healthScore,
                    summary: r.summary,
                    // steps: r.steps,
                    dishTypes: r.dishTypes,
                    image: r.image,
                    diets: (_a = r.diets) === null || _a === void 0 ? void 0 : _a.map((diet) => diet),
                };
            });
            return recipesFromAPI;
        }
        else {
            console.log(`Estoy en el else de axiosData no es mayor a 0`);
            console.log(`axiosData: ${axiosData}`);
            return [];
        }
    }
    catch (error) {
        console.log("Error en getAllFromApi");
        console.log(error.message);
        return [];
    }
});
exports.getAllFromAPI = getAllFromAPI;
const getAllGlobal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allFromDB = yield (0, exports.getAllFromDB)();
        console.log("allFromDB: ");
        console.log(allFromDB.length);
        let allFromAPI = yield (0, exports.getAllFromAPI)();
        console.log("allFromAPI:");
        console.log(allFromAPI.length);
        // let allGlobal:any = allFromDB.concat(allFromAPI);
        let allGlobal = [...allFromDB, ...allFromAPI];
        console.log(`allGlobal.length = ${allGlobal.length}`);
        return allGlobal;
    }
    catch (error) {
        console.log("Error en getAllGlobal");
        console.log(error.message);
        return [];
    }
});
exports.getAllGlobal = getAllGlobal;
