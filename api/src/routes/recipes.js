const { Router } = require("express");
const { Recipe, Diet } = require("../db");
// const Recipe = require("../models/Recipe");
const { MI_API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const router = Router();

const addRecipeInfoTrue = "addRecipeInformation=true";
const NUMBER = "number=39";

//h--- Funciones auxiliares: ----------------------------
// function fromQueryToURL(obj) {
//   let urleado = "";
//   for (const [key, value] of Object.entries(obj)) {
//     urleado += `${key}=${value}&`;
//   }
//   return urleado;
// }

function userIntroducedProhibitedSimbols(inputString) {
  let charactersNotAllowed = /[^{};@>!<]*$/g;
  // /[^<;>@}{!]*$/g;
  if (inputString.search(charactersNotAllowed) !== 0) {
    console.log("ENTRË al !== 0 del USERiNTRODUCEDpHOsIMBOLS");
    return true;
  } else {
    return false;
  }
}

//*--  CREAR MODULARIZACIONES PARA BUSCAR RECETAS EN DB Y API:

const getByTitleFromAPI = async (title) => {
  try {
    const axiosFromApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&query=${title}&${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`
    );
    const axiosDataResults = axiosFromApi.data.results;
    console.log(`getByTitleFromAPI. title = ${title}`);
    if (axiosDataResults.length > 0) {
      let recipesFromAPI = await axiosDataResults.map((r) => {
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
          diets: r.diets?.map((diet) => diet),
        };
      });
      console.log(`recipesFromAPI.length = ${recipesFromAPI.length}`);
      return recipesFromAPI;
    } else {
      console.log(
        "No se encontró nada en API al parecer. Retorno un arreglo vacío"
      );
      return [];
    }
  } catch (error) {
    console.log("Error en getByTitleFromAPI");
    console.log(error.message);
    return [];
  }
};

const getByTitleFromDB = async (title) => {
  console.log("Entré al getByTitleFromDB");
  console.log(`title = ${title}`);
  try {
    let allFromDB = await Recipe.findAll({
      include: {
        model: Diet,
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
    let allFromDBFilteredByTitle = await allFromDB.filter((recipe) =>
      recipe.title.includes(titleLowerCase)
    );
    console.log(
      `allFromDBFilteredByTitle.length = ${allFromDBFilteredByTitle.length}`
    );
    let allFromDBFilteredPlusDiets = await allFromDBFilteredByTitle?.map(
      (recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          steps: recipe.steps,
          image: recipe.image,
          diets: recipe.diets?.map((diet) => diet.name),
        };
      }
    );
    console.log(
      `allFromDBFilteredPlusDiets.length = ${allFromDBFilteredPlusDiets.length}`
    );

    // let filteredByTitle = allFromDB.filter((recipe) =>
    //   recipe.title.includes(title)
    // );
    // console.log(`filteredByTitle.length = ${filteredByTitle.length}`);
    return allFromDBFilteredPlusDiets;
  } catch (error) {
    console.log("Error en getByTitleFromDB");
    console.log(error.message);
    return [];
  }
};

const getAllFromDB = async () => {
  try {
    const recipesDB = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let recipesDBPlusDiets = await recipesDB?.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.steps,
        image: recipe.image,
        diets: recipe.diets?.map((diet) => diet.name),
      };
    });
    return recipesDBPlusDiets;
  } catch (error) {
    console.log("Error en getAllFromDB");
    console.log(error.message);
    return [];
  }
};

const getAllFromAPI = async () => {
  try {
    console.log("Entré al getAllFromAPI");
    const axiosFromApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`
    );
    // console.log(axiosFromApi.data);
    const axiosData = axiosFromApi.data?.results;

    if (axiosData.length > 0) {
      let recipesFromAPI = await axiosData.map((r) => {
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
          diets: r.diets?.map((diet) => diet),
        };
      });
      return recipesFromAPI;
    } else {
      console.log(`Estoy en el else de axiosData no es mayor a 0`);
      console.log(`axiosData: ${axiosData}`);
      return [];
    }
  } catch (error) {
    console.log("Error en getAllFromApi");
    console.log(error.message);
    return [];
  }
};

const getAllGlobal = async () => {
  try {
    let allFromDB = await getAllFromDB();
    console.log("allFromDB: ");
    console.log(allFromDB.length);
    let allFromAPI = await getAllFromAPI();
    console.log("allFromAPI:");
    console.log(allFromAPI.length);
    let allGlobal = allFromDB.concat(allFromAPI);
    console.log(`allGlobal.length = ${allGlobal.length}`);
    return allGlobal;
  } catch (error) {
    console.log("Error en getAllGlobal");
    console.log(error.message);
    return [];
  }
};

//h------------------------------

//*------------------------------------------------------------------------------------------------------

//* POST
router.post("/", async (req, res) => {
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
    if (userIntroducedProhibitedSimbols(title)) {
      return res
        .status(400)
        .send({ error: `The title has prohibited simbols.` });
    }
    if (summary.length > 500 || summary.length < 1) {
      return res.status(400).send({
        error: `Summary has ${summary.length} characters. Max: 500, Min: 1`,
      });
    }
    if (userIntroducedProhibitedSimbols(summary)) {
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

    let newRecipe = await Recipe.create({
      title: title.toLowerCase(),
      summary,
      healthScore,
      steps,
      image,
    });

    let dietsToSet = await Diet.findAll({
      where: { name: diets },
    });

    console.log("dietsToSet: " + dietsToSet);
    newRecipe.addDiets(dietsToSet);

    console.log("Nueva receta creada!");
    return res.status(200).send(newRecipe);
  } catch (error) {
    console.log(error.message);
    return res.status(404).send({ error: error.message });
  }
});
//*----------------------------------------------------------------

//* GET BY ID:
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
      let recipeDB = await Recipe.findByPk(idReceta, {
        include: {
          model: Diet,
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
      let axiData = axiado.data;
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
        // steps: axiData.analyzedInstructions?.[0]?.steps, //Atención a este ?.chain!
        diets: axiData.diets,
      };
      return res.status(200).send(axiadoDetails);
    }
  } catch (error) {
    console.log(`Hubo un error en el catch final del get por ID`);
    errorObject.summary = error.message;
    errorObject.error = error.message;
    console.log(error.message);
    return res.status(404).send(errorObject);
  }
});

router.get("/", async (req, res) => {
  const { query, diet } = req.query;
  console.log(`Entré al get. query = ${query}`);
  try {
    if (query) {
      let fromDB = await getByTitleFromDB(query);
      let fromAPI = await getByTitleFromAPI(query);
      let allConcat = fromDB.concat(fromAPI);
      return res.status(200).send(allConcat);
    } else {
      console.log("Buscando allGlobal...");
      let allGlobal = await getAllGlobal();
      console.log(`allGlobal.length = ${allGlobal.length}`);
      return res.status(200).send(allGlobal);
    }
  } catch (error) {
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

//* --- GET sólo de DB:
router.get("/getAllFromDB", async (req, res) => {
  console.log("Entré a /getAllFromDB");
  try {
    let recetasFromDB = await Recipe.findAll();
    res.status(200).send(recetasFromDB);
  } catch (error) {
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
