import db from "../../models";
const { MI_API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
import { IDiet } from "../../types/diet-types";
import {
  IRecipeFromApi,
  IRecipeFromDB,
  IRecipeFromDBPlusDietModel,
} from "../../types/recipe-types";

const addRecipeInfoTrue = "addRecipeInformation=true";
const NUMBER = "number=100";

//FUNCIONES AUXILIARES RE RECIPE-ROUTE:

export function userIntroducedProhibitedSimbols(inputString: string) {
  let charactersNotAllowed = /[^{};@>!<]*$/g;
  // /[^<;>@}{!]*$/g;
  if (inputString.search(charactersNotAllowed) !== 0) {
    console.log("ENTRË al !== 0 del USERiNTRODUCEDpHOsIMBOLS");
    return true;
  } else {
    return false;
  }
}

// function fromQueryToURL(obj) {
//   let urleado = "";
//   for (const [key, value] of Object.entries(obj)) {
//     urleado += `${key}=${value}&`;
//   }
//   return urleado;
// }

export const getByTitleFromAPI = async (title: string) => {
  try {
    const axiosFromApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&query=${title}&${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`
    );
    const axiosDataResults = axiosFromApi.data.results;
    console.log(`getByTitleFromAPI. title = ${title}`);
    if (axiosDataResults.length > 0) {
      let recipesFromAPI: IRecipeFromApi[] = await axiosDataResults.map(
        (r: IRecipeFromApi) => {
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
        }
      );
      console.log(`recipesFromAPI.length = ${recipesFromAPI.length}`);
      return recipesFromAPI;
    } else {
      console.log(
        "No se encontró nada en API al parecer. Retorno un arreglo vacío"
      );
      return [];
    }
  } catch (error: any) {
    console.log("Error en getByTitleFromAPI");
    console.log(error.message);
    return [];
  }
};

export const getByTitleFromDB = async (title: string) => {
  console.log("Entré al getByTitleFromDB");
  console.log(`title = ${title}`);
  try {
    let allFromDB: IRecipeFromDBPlusDietModel[] = await db.Recipe.findAll({
      include: {
        model: db.Diet,
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
    let allFromDBFilteredByTitle: IRecipeFromDBPlusDietModel[] =
      allFromDB.filter((recipe: IRecipeFromDB) =>
        recipe.title.includes(titleLowerCase)
      );
    console.log(
      `allFromDBFilteredByTitle.length = ${allFromDBFilteredByTitle.length}`
    );
    let allFromDBFilteredPlusDiets = allFromDBFilteredByTitle?.map((recipe) => {
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
    console.log(
      `allFromDBFilteredPlusDiets.length = ${allFromDBFilteredPlusDiets.length}`
    );

    // let filteredByTitle = allFromDB.filter((recipe) =>
    //   recipe.title.includes(title)
    // );
    // console.log(`filteredByTitle.length = ${filteredByTitle.length}`);
    return allFromDBFilteredPlusDiets;
  } catch (error: any) {
    console.log("Error en getByTitleFromDB");
    console.log(error.message);
    return [];
  }
};

export const getAllFromDB = async () => {
  try {
    const recipesDB: IRecipeFromDBPlusDietModel[] = await db.Recipe.findAll({
      include: {
        model: db.Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let recipesDBPlusDiets: IRecipeFromDB[] = recipesDB?.map(
      (recipe: IRecipeFromDBPlusDietModel) => {
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
    return recipesDBPlusDiets;
  } catch (error: any) {
    console.log("Error en getAllFromDB");
    console.log(error.message);
    return [];
  }
};

export const getAllFromAPI = async () => {
  try {
    console.log("Entré al getAllFromAPI");
    const axiosFromApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`
    );
    // console.log(axiosFromApi.data);
    const axiosData = axiosFromApi.data?.results;

    if (axiosData.length > 0) {
      let recipesFromAPI: IRecipeFromApi[] = await axiosData.map(
        (r: IRecipeFromApi) => {
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
        }
      );
      return recipesFromAPI;
    } else {
      console.log(`Estoy en el else de axiosData no es mayor a 0`);
      console.log(`axiosData: ${axiosData}`);
      return [];
    }
  } catch (error: any) {
    console.log("Error en getAllFromApi");
    console.log(error.message);
    return [];
  }
};

export const getAllGlobal = async () => {
  try {
    let allFromDB: IRecipeFromDB[] = await getAllFromDB();
    console.log("allFromDB: ");
    console.log(allFromDB.length);
    let allFromAPI: IRecipeFromApi[] = await getAllFromAPI();
    console.log("allFromAPI:");
    console.log(allFromAPI.length);
    // let allGlobal:any = allFromDB.concat(allFromAPI);
    let allGlobal: Array<any> = [...allFromDB, ...allFromAPI];
    console.log(`allGlobal.length = ${allGlobal.length}`);
    return allGlobal;
  } catch (error: any) {
    console.log("Error en getAllGlobal");
    console.log(error.message);
    return [];
  }
};
