const { MI_API_KEY } = process.env;
const axios = require("axios");
// const { Op } = require("sequelize");
import { Router } from "express";
const router = Router();

import { userIntroducedProhibitedSimbols } from "../../auxiliaryFns/recipe-AuxFns";
import {
  IRecipeFromApi,
  IRecipeFromDB,
  IRecipeFromDBPlusDietModel,
} from "../../types/recipe-types";
import {
  getAllGlobal,
  getByTitleFromAPI,
  getByTitleFromDB,
} from "./recipe-r-fns";
import db from "../../models";
import { checkNewRecipe } from "../../validators/recipeValidators";

// -------- ROUTES : ----------------------------

// POST RECIPE
router.post("/", async (req, res) => {
  console.log("Entré al post");
  const { title, summary, healthScore, diets, steps, image } = req.body;
  console.log(`Title: ${title}`);
  try {
    // --- VALIDACIONES:
    // if (!title || !summary) {
    //   return res
    //     .status(400)
    //     .send({ error: "title and summary are mandatory." });
    // }
    // if (title.length > 100 || title.length < 1) {
    //   return res.status(400).send({
    //     error: `Title length must be between 1 and 100 characters. It has ${title.length}.`,
    //   });
    // }
    // if (userIntroducedProhibitedSimbols(title)) {
    //   return res
    //     .status(400)
    //     .send({ error: `The title has prohibited simbols.` });
    // }
    // if (summary.length > 500 || summary.length < 1) {
    //   return res.status(400).send({
    //     error: `Summary has ${summary.length} characters. Max: 500, Min: 1`,
    //   });
    // }
    // if (userIntroducedProhibitedSimbols(summary)) {
    //   return res.status(400).send({
    //     error: `Summary has prohibited simbols.`,
    //   });
    // }
    // if (healthScore) {
    //   if (typeof healthScore !== "number") {
    //     return res.status(400).send({
    //       error: `HealthScore must be a number.`,
    //     });
    //   }
    //   if (healthScore > 100 || healthScore < 0) {
    //     return res.status(400).send({
    //       error: `Health score ${healthScore} must be between 0 and 100.`,
    //     });
    //   }
    // }
    // if (steps && steps.length > 3000) {
    //   return res.status(400).send({
    //     error: `Steps exceeded the maximum 3000 characters. Actual length: ${steps.length}`,
    //   });
    // }
    // --- FIN VALIDACIONES ---

    const validatedNewRecipe: IRecipeFromDB = checkNewRecipe(req.body);

    let newRecipe = await db.Recipe.create(validatedNewRecipe);

    let dietsToSet = await db.Diet.findAll({
      where: { name: diets },
    });

    console.log("dietsToSet: " + dietsToSet);
    newRecipe.addDiets(dietsToSet);

    console.log("Nueva receta creada!");
    return res.status(200).send(newRecipe);
  } catch (error: any) {
    console.log(error.message);
    return res.status(404).send({ error: error.message });
  }
});

// GET BY ID:
router.get("/:idReceta", async (req, res) => {
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
      let recipeDB: IRecipeFromDBPlusDietModel = await db.Recipe.findByPk(
        idReceta,
        {
          include: {
            model: db.Diet,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        }
      );
      if (recipeDB) {
        let recipeObject: IRecipeFromDB = {
          title: recipeDB.title,
          id: recipeDB.id,
          summary: recipeDB.summary,
          healthScore: recipeDB.healthScore,
          steps: recipeDB.steps,
          image: recipeDB.image,
          diets: recipeDB?.diets.map((diet) => diet.name),
        };
        return res.status(200).send(recipeObject);
      } else {
        return res.status(400).send(errorObject);
      }
    } else {
      console.log(`Buscar en API con id: ${idReceta}`);
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MI_API_KEY}`
      );
      let axiData: IRecipeFromApi = axiado.data;
      console.log("Receta buscada en API");
      console.log(`Receta title: ${axiData?.title}`);
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
        steps: axiData.analyzedInstructions[0]?.steps,
        diets: axiData.diets,
      };
      return res.status(200).send(axiadoDetails);
    }
  } catch (error: any) {
    console.log(`Hubo un error en el catch final del get por ID`);
    errorObject.summary = error.message;
    errorObject.error = error.message;
    console.log(error.message);
    return res.status(404).send(errorObject);
  }
});

// GET BY QUERY TITLE
router.get("/", async (req, res) => {
  const query: any = req.query.query;
  console.log(`Entré al get. query = ${query}`);
  try {
    if (query) {
      let fromDB = await getByTitleFromDB(query);
      let fromAPI = await getByTitleFromAPI(query);
      // let allConcat = fromDB.concat(fromAPI);
      let allConcat = [...fromDB, ...fromAPI];
      return res.status(200).send(allConcat);
    } else {
      console.log("Buscando allGlobal...");
      let allGlobal = await getAllGlobal();
      console.log(`allGlobal.length = ${allGlobal.length}`);
      return res.status(200).send(allGlobal);
    }
  } catch (error: any) {
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
});

//* --- GET ALL FROM DB:
router.get("/getAllFromDB", async (req, res) => {
  console.log("Entré a /getAllFromDB");
  try {
    let recetasFromDB: IRecipeFromDB[] = await db.Recipe.findAll();
    res.status(200).send(recetasFromDB);
  } catch (error: any) {
    console.log("Error en getAllFromDB!");
    console.log(error.message);
    res.status(402).send(error.message);
  }
});

// Comentario para adaptar a query por title y/o diet:
//Para poder hacer busqueda por title y por diet, tengo que agregar una función que busque en la DB por diet. Porque por la API sólo tengo que agregar ese string a la URL y listo.
// Pero para la DB tengo que hacer un filtro adicional chequeando en diets después de agregar esa propiedad a el objeto. ES FÁCIL!!!!
//  en el get, if (query && diet) hacer busquedas con funcion getByTitleDietFrom DB/API, y if (diet) hacer bisquedas con funciongetByDietFrom DB/API.
// Podría incluso modularizarlas más como hice con las de ordenamiento y filter en react.
//----------------------------------

module.exports = router;
