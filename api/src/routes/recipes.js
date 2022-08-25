const { Router } = require("express");
const { Recipe, Diet } = require("../db");
// const Recipe = require("../models/Recipe");
// const { MY_API_KEY } = process.env;
const MI_API_KEY = "08627e517b4943fe9b66893317a91541";
const axios = require("axios");
const { Op } = require("sequelize");

const router = Router();

const addRecipeInfoTrue = "addRecipeInformation=true";
const NUMBER = "number=39";
//h-------------------------------
function fromQueryToURL(obj) {
  let urleado = "";
  for (const [key, value] of Object.entries(obj)) {
    urleado += `${key}=${value}&`;
  }
  return urleado;
}
//h------------------------------

//---------------------------------------------------------------------

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

//* EXPERIMENTACIÓN:

//*------------------------------------------------------------------------------------------------------

//* POST nuevo experimental QUE ANDA BIEN!!!!!:
router.post("/", async (req, res) => {
  console.log("Entré al post");
  const { title, summary, healthScore, diets, steps, image } = req.body;
  console.log(typeof healthScore);
  try {
    if (!title || !summary) {
      return res.status(400).send({ error: "title and summary are mandatory" });
    }
    if (typeof healthScore !== "number") {
      console.log("Error! healthScore must be a number");
      return res.status(400).send({
        error: `Health score ${healthScore} must be a NUMBER from 0 to 100.`,
      });
    }
    if (healthScore) {
      if (healthScore > 100 || healthScore < 0) {
        return res.status(400).send({
          error: `Health score ${healthScore}must be between 0 and 100.`,
        });
      }
    }
    if (title.length > 100) {
      return res.status(400).send({
        error: `Title must have less than 100 characters. It has ${title.length}`,
      });
    }
    //! Que desde el front se ocupen de ponerle una imagen al momento de renderizarla en caso de que no tengan una.
    let newRecipe = await Recipe.create({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      summary,
      healthScore,
      steps,
      image,
    });

    // let dietsToSet = await Promise.all(
    //   diets.map((d) => Diet.findOne({ where: { name: d } }))
    // );

    let dietsToSet = await Diet.findAll({
      where: { name: diets },
    });

    console.log("dietsToSet: " + dietsToSet);
    newRecipe.addDiets(dietsToSet);

    // await newRecipe.addDiets([3, 8]);
    // console.log("Soy el summary: " + newRecipe.summary);
    // let getDiets = await newRecipe.getDiets();
    // console.log("getDiets: ");
    // console.log(getDiets[0].dataValues.name, getDiets[1].dataValues.name);
    return res.status(200).send(newRecipe);
  } catch (error) {
    console.log(error.message);
    return res.status(403).send(error);
  }
});
//*----------------------------------------------------------------

//* EXPERIMENTACIÓN CON GET BY ID:
router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;
  console.log("idReceta: ", idReceta);
  //creo objeto para responder en caso de error:
  let errorObject = {
    title: "Recipe not found",
    summary: "Nothing to show here...",
    healthScore: 0,
    steps: [],
    image: "https://clipground.com/images/avoid-junk-food-clipart-7.jpg",
    diets: ["null"],
  };
  console.log("errorObject :", errorObject);
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
    console.log(error.message);
    return res.status(404).send(errorObject);
  }
});

//*--  CREAR MODULARIZACIONES PARA BUSCAR RECETAS EN DB.

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
    let allFromDBFilteredByTitle = await allFromDB.filter((recipe) =>
      recipe.title.includes(title)
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

//! Para poder hacer busqueda por title y por diet, tengo que agregar una función que busque en la DB por diet. Porque por la API sólo tengo que agregar ese string a la URL y listo.
//! Pero para la DB tengo que hacer un filtro adicional chequeando en diets después de agregar esa propiedad a el objeto. ES FÁCIL!!!!
//  en el get, if (query && diet) hacer busquedas con funcion getByTitleDietFrom DB/API, y if (diet) hacer bisquedas con funciongetByDietFrom DB/API.
// Podría incluso modularizarlas más como hice con las de ordenamiento y filter en react.

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
    console.log("Error en el get");
    console.log(error.message);
    return res.status(404).send(error.message);
  }
});

module.exports = router;

//*BackUp de ruta que funcionaba bien, pero le faltaba traer a las Recipes de la DB el array de dietas. El resto andaba bien. Y también buscaba por query+diets!! :

//* --- GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Incluir los tipos de dieta asociados (esto ya deberia venir en la data)
//! Esta ruta puede ser pulida..
// router.get("/:idReceta", async (req, res) => {
//   console.log("Entré al get /:idReceta");
//   const idReceta = req.params.idReceta;
//   if (!idReceta) {
//     return res.status(404).send("Debe ingresar por params el id de la receta");
//   }
//   try {
//     let recetaEncontrada;
//     if (idReceta.length > 31) {
//       //(si la PK es UUIDV4):
//       console.log("Buscando recenta en DB: idReceta.length > 31");
//       recetaEncontrada = await Recipe.findByPk(idReceta);
//     }
//     if (!recetaEncontrada) {
//       console.log("Buscando receta en API...");
//       //(si no encuentro la receta en la DB, chequeo la API por si las dudas...:)
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MI_API_KEY}`
//       );
//       console.log("Receta buscada en API");
//       console.log(`Receta title: ${axiado.data?.title}`);
//       return res.status(200).send(axiado.data);
//     }
//     console.log("Devolviendo buscada en DB..:");
//     return res.status(200).send(recetaEncontrada);
//   } catch (error) {
//     console.log(`Error! ${error.message}`);
//     return res.send(error.message);
//   }
// });

//* POST ACTUAL QUE FUNCIONA, pero no perfecto por el tema de las associations.
// router.post("/", async (req, res) => {
//   const { title, summary, healthScore, diet, dietId } = req.body;
//   if (!title || !summary) {
//     console.log("Title o summary no ingresados!");
//     return res.status(400).send("title and summary are mandatory");
//   }
//   try {
//     //agregar a la db:
//     const data = { title, summary, healthScore, diet };
//     console.log(`Entré al TRY: diet: ${diet}; dietId: ${dietId}`);
//     const newRecipe = await Recipe.create(data);
//     if (Array.isArray(dietId) && dietId.length > 0) {
//       console.log(`Entré al Array.isArray(${dietId})`);
//       for (let i = 0; i < dietId.length; i++) {
//         await newRecipe.addDiet(dietId[i]); //! probando setear FK.
//         console.log(`acabo de meter un addDiet con ${dietId[i]}`);
//       }
//     }
//     if (dietId && !Array.isArray(dietId)) {
//       console.log(`Entré al !Array.isArray(${dietId})`);
//       await newRecipe.addDiet(dietId);
//     }
//     //     //! Si dietId fuese un arreglo, directamente le paso todos los id. Tengo que hacer que en el req.body me llegue un key "dietId" = [4, 2, 1, 8].
//     //     //! Y le paso ese array a newRecipe.addDiets(dietId).
//     //     //! Además, debería guardar como atributo diet un string de las dietas. Tengo que hacer esto en este paso. Al crear la instancia nueva de la receta acá.
//     //     //! Podría hacer que se forme el string directamente en el front y se posteen la prop diet ya como un string.... pero quizás sea mejor hacerlo desde acá, o ni siquiera ir por este camino ya que si me modifican la asosiacion entre la receta y la diet, no se me actualizaría  ya que está en forma de string. Debería enviar la prop dietId que tiene el model, y
//     //     //! una vez que recibo esos números en el front, lo renderizo según cada número. ESTA CREO QUE ES LA MEJOR. PROBAR SI RECIBO dietId con muchos números o qué

//     console.log("Receta creada!! newRecipe: ");
//     console.log(`${newRecipe}`);
//     return res.status(201).json(newRecipe);
//   } catch (error) {
//     console.log("Error al intentar crear la receta!!");
//     return res.status(402).send(error.message);
//   }
// });

//* --- POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//? Cómo relaciono sus tipos de dietas?

// router.post("/", async (req, res) => {
//   const { title, summary, healthScore, diet, dietId } = req.body;
//   if (!title || !summary) {
//     console.log("Title o summary no ingresados!");
//     return res.status(400).send("title and summary are mandatory");
//   }
//   try {
//     //agregar a la db:
//     const data = { title, summary, healthScore, diet };
//     const newRecipe = await Recipe.create(data);
//     // await newRecipe.addDiet(dietId); //! probando setear FK.
//     //! Si dietId fuese un arreglo, directamente le paso todos los id. Tengo que hacer que en el req.body me llegue un key "dietId" = [4, 2, 1, 8].
//     //! Y le paso ese array a newRecipe.addDiets(dietId).
//     //! Además, debería guardar como atributo diet un string de las dietas. Tengo que hacer esto en este paso. Al crear la instancia nueva de la receta acá.
//     //! Podría hacer que se forme el string directamente en el front y se posteen la prop diet ya como un string.... pero quizás sea mejor hacerlo desde acá, o ni siquiera ir por este camino ya que si me modifican la asosiacion entre la receta y la diet, no se me actualizaría  ya que está en forma de string. Debería enviar la prop dietId que tiene el model, y
//     //! una vez que recibo esos números en el front, lo renderizo según cada número. ESTA CREO QUE ES LA MEJOR. PROBAR SI RECIBO dietId con muchos números o qué

//     console.log("Receta creada!!");
//     return res.status(201).json(newRecipe);
//   } catch (error) {
//     console.log("Error al intentar crear la receta!!");
//     return res.status(402).send(error.message);
//   }
// });

//* --- GET /recipes?name="...":  CREO QUE FUNCIONA BIEN! LO COMENTO PARA PROBAR LOS EXPERIMENTOS:
//- hacer el get con/sin query con suma de API y DB:

// router.get("/", async (req, res) => {
//   const { query, diet } = req.query;
//   console.log(`Soy query: ${query}`);
//   console.log(`Soy diet: ${diet} y mi .length es: ${diet.length}`);
//   console.log(`Soy el req.query: ${req.query} y mi length es: ${diet.length}`);
//   let queryToURL = fromQueryToURL(req.query);
//   let fromDB = [];
//   let concatAPIyDB = [];
//   console.log("Entré en el get '/'");
//   console.log(`Soy el queryToURL: ${queryToURL}`);
//   console.log(`queryToURL.length: ${queryToURL.length}`);
//   try {
//     // si me envian query y diet válidos...:
//     if (query && query.length > 1 && diet && diet.length > 1) {
//       console.log("ENtré al QUERY y DIET son VÁLIDOS");
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(axiado.data.results);
//       console.log(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       let fromDB = await Recipe.findAll({
//         where: {
//           title: query,
//           diet: diet,
//         },
//       });
//       console.log(fromDB);

//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       console.log(`retornando concatAPIyDB: ${concatAPIyDB}`);
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (query && query.length > 1) {
//       console.log(
//         "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
//       );
//       fromDB = await Recipe.findAll({
//         where: { title: query }, //! hacer que no sea igualación exacta si no mas bien un includes o algo así.
//       });
//       console.log(`Soy fromDB: ${fromDB}`);
//       console.log(`Soy fromDB.length: ${fromDB.length}`);

//       console.log(`Buscar en API..`);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (diet && diet.length > 1) {
//       console.log("Entré al (diet && diet.length > 1)");
//       fromDB = await Recipe.findAll({
//         where: { diet: diet },
//       });
//       console.log(`Soy fromDB: ${fromDB}`);

//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     } else {
//       console.log(
//         `Entro al else final si no me ingresan title ni diet o son de 1 caracter... `
//       );
//       fromDB = await Recipe.findAll();
//       console.log(`fromDB.length: ${fromDB.length} `);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(`axiado.data.length: ${axiado.data.results.length}`);
//       if (axiado.data.results?.length >= 1) {
//         console.log(`Entré al axiado.data.results?.length >= 1`);
//         concatAPIyDB = [...fromDB, ...axiado.data.results];
//         console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//         return res.status(203).send(concatAPIyDB);
//       } else {
//         concatAPIyDB = [...fromDB];
//       }
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       return res.status(204).send(concatAPIyDB);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${NUMBER}&${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });
//!---- EL DE ARRIBA CREO QUE ANDA "BIEN". Lo comenté para probar los nuevos experimentos.

//*-- EXPERIMENTACIÓN ---------------------------------------------------------------------------
//! ESTE GET LO COMENTO PARA PROBAR EL DE ARRIBA MODULARIZADO. ESTE DE ABAJO ES EXPERIMENTAL PERO PODRÍA ANDAR BIEN ASI COMO ESTA....
// router.get("/", async (req, res) => {
//   const { query, diet } = req.query;
//   console.log(`Soy query: ${query}`);
//   console.log(`Soy diet: ${diet} y mi .length es: ${diet.length}`);
//   console.log(`Soy el req.query: ${req.query} y mi length es: ${diet.length}`);
//   let queryToURL = fromQueryToURL(req.query);
//   let fromDB = [];
//   let concatAPIyDB = [];
//   console.log("Entré en el get '/'");
//   console.log(`Soy el queryToURL: ${queryToURL}`);
//   console.log(`queryToURL.length: ${queryToURL.length}`);
//   try {
//     // si me envian query y diet válidos...:
//     if (query && query.length > 1 && diet && diet.length > 1) {
//       console.log("ENtré al QUERY y DIET son VÁLIDOS");
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(axiado.data.results);
//       // let fromDB = await Recipe.findAll({
//       //   where: {
//       //     title: query,
//       //     diet: diet,
//       //   },
//       // });
//       // console.log(fromDB);
//       //!----
//       // let filteredByName = getByTitleFromDB(query);
//       // console.log("filteredByName: " + filteredByName);
//       //!----
//       const dBRecipes = await Recipe.findAll({
//         where: {
//           title: {
//             [Op.iLike]: `%${query}%`,
//           },
//         },
//         include: Diet,
//       });
//       let dBRecipesPlusDiets = dBRecipes.map((recipe) => {
//         return {
//           id: recipe.id,
//           title:
//             recipe.title.trim().toLowerCase().charAt(0).toUpperCase() +
//             recipe.title.substring(1),
//           healthScore: recipe.healthScore,
//           summary: recipe.summary,
//           steps: recipe.steps,
//           diets: recipe.Diet.map((d) => d.name),
//         };
//       });
//       console.log(`dBRecipesPlusDiets.length = ${dBRecipesPlusDiets.length}`);
//       console.log(dBRecipesPlusDiets);

//       let filteredPlusDiets = dBRecipesPlusDiets.filter((r) =>
//         r.diets.includes(diet)
//       );
//       console.log(`filteredPlusDiets.length = ${filteredPlusDiets.length}`);
//       // console.log(filteredPlusDiets);
//       concatAPIyDB = [...filteredPlusDiets, ...axiado.data.results];
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       console.log(`retornando concatAPIyDB: ${concatAPIyDB}`);
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (query && query.length > 1) {
//       console.log(
//         "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
//       );
//       //! Acá tendría que usar un includes o algo así...:
//       let filteredByName = getByTitleFromDB(query);

//       // fromDB = await Recipe.findAll({
//       //   where: { title: query },
//       // });
//       // console.log(`Soy fromDB: ${fromDB}`);
//       // console.log(`Soy fromDB.length: ${fromDB.length}`);

//       console.log(`Buscar en API..`);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...filteredByName, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     }
//     if (diet && diet.length > 1) {
//       //! Acá tengo que buscar por pks en tabla relacional?
//       console.log("Entré al (diet && diet.length > 1)");
//       fromDB = await Recipe.findAll({
//         where: { diet: diet },
//       });
//       console.log(`Soy fromDB: ${fromDB}`);

//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(
//         `Soy axiado.result.data.length ${axiado.data.results.length}`
//       );
//       console.log(`Soy axiado.result.data: ${axiado.data.results}`);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(200).send(concatAPIyDB);
//     } else {
//       console.log(
//         `Entro al else final si no me ingresan title ni diet o son de 1 caracter... `
//       );
//       fromDB = await Recipe.findAll();
//       console.log(`fromDB.length: ${fromDB.length} `);
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       console.log(`axiado.data.length: ${axiado.data.results.length}`);
//       if (axiado.data.results?.length >= 1) {
//         console.log(`Entré al axiado.data.results?.length >= 1`);
//         concatAPIyDB = [...fromDB, ...axiado.data.results];
//         console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//         return res.status(203).send(concatAPIyDB);
//       } else {
//         concatAPIyDB = [...fromDB];
//       }
//       console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
//       return res.status(204).send(concatAPIyDB);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });
//! -- EL DE ARRIBA PODRÍA FUNCIONAR AUNQUE ESTÁ EN ETAPA DE MODIFICACION EXPERIMENTAL.
//*-----------------------------------------------------------------
//!CÓDIGO QUE NO SIRVE PERO DEJO LOS BACKUPS: ------------------------------------------------------------------------

//*----- hacer el get con/sin query con suma de API y DB:
// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado:
//cómo busco con un "includes" en cada atributo? Con el Op.
//h Acá faltaría el "Si no existe ninguna receta mostrar un mensaje adecuado".
//h Setear por default a number=99 para que me traiga más de 9 resultados
// router.get("/", async (req, res) => {
//   const { query, diet } = req.query;
//   console.log(`Soy query: ${query}`);
//   console.log(`Soy diet: ${diet}`);
//   console.log(`Soy el req.query: ${req.query}`);
//   let queryToURL = fromQueryToURL(req.query);
//   let fromDB = [];
//   let concatAPIyDB = [];
//   console.log("Entré en el get '/'");
//   console.log(`Soy el queryToURL: ${queryToURL}`);
//   console.log(`queryToURL.length: ${queryToURL.length}`);
//   try {
//     // si me envian algo por query:
//     if (queryToURL.length >= 2) {
//       console.log("ENtré al >= 2");
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );

//       console.log(queryToURL);
//       console.log(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       //! Esto de acá abajo es para que no me choque la prop query en la DB, ya que no existe query en el Model Receta:
//       if (query && query.length > 1) {
//         console.log(
//           "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
//         );
//         fromDB = await Recipe.findAll({
//           where: { title: req.query.query },
//         });
//       } else {
//         console.log("Entré al else (req.query.query no existe)");
//         if (diet && diet.length > 3) {
//           console.log("Si req.query.diet existe...y su length es mayor a 3");
//           fromDB = await Recipe.findAll({
//             where: { diet: diet },
//           });
//         }
//       }

//       //!----------------------------
//       //traer también lo que haya en la DB:
//       console.log(`Soy ASD: req.query.query: ${req.query.query}`);

//       console.log("Length the fromDB: ", fromDB.length);
//       // let fromDBFiltered = fromDB.filter(
//       //   (recipe) => recipe.title == req.query?.query
//       // );
//       console.log("Soy el largo del fromDB: ", fromDB.length);
//       concatAPIyDB = [...fromDB, ...axiado.data.results];
//       return res.status(208).send(concatAPIyDB);
//     } else {
//       console.log("Entré en el try else del get '/' length < 2");
//       let axiadoSinQuery = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&apiKey=${MI_API_KEY}`
//       );
//       fromDB = await Recipe.findAll();

//       concatAPIyDB = [...fromDB, ...axiadoSinQuery.data.results];
//       return res.status(201).send(concatAPIyDB);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });

//h---probando get para querys: ANDA JOYA CON LA API NADA MÁS!!!!!!:
// router.get("/query", async (req, res) => {
//   //cómo busco con un "includes" en cada atributo?

//   let queryToURL = fromQueryToURL(req.query);
//   // let fromDB = [];
//   try {
//     // si me envian algo por query:
//     if (queryToURL.length >= 2) {
//       let axiado = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
//       );

//       console.log("ENtré al >= 2");
//       console.log(queryToURL);
//       console.log(
//         `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}apiKey=${MI_API_KEY}`
//       );
//       //traer también lo que haya en la DB:
//       // let fromDB = [];

//       return res.status(208).send(axiado.data);
//     } else {
//       let axiadoSinQuery = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${MI_API_KEY}`
//       );
//       return res.status(201).send(axiadoSinQuery.data);
//     }
//   } catch (error) {
//     console.log(
//       `https://api.spoonacular.com/recipes/complexSearch?${queryToURL}&apiKey=${MI_API_KEY}`
//     );
//     console.log("ERROR ACÄ!!!: ", error.message);
//     return res.send(error.message);
//   }
// });
//h-----------lo de arriba anda bien para lo que está hecho!---------------------------------------

// router.get("/", async (req, res) => {
//   const { name } = req.query;
//   //! Acá en realidad tengo que pasar por el "where" todas las key-values que me pasan por query.
//   if (!name) {
//     return res.status(400).send("No recibí un name por query");
//   }
//   try {
//     const busqueda = await Recipe.findAll({
//       //h tendría que hacer que incluya en el name la palabra que me llega por query, en vez de buscar exactamente ese name.
//       where: { name: name },
//     });
//     //! después de obtener "busqueda", concatenar con lo que me traiga la API
//     console.log(busqueda.length);
//     console.log("Soy la busqueda: ", busqueda.toJSON);
//     console.log(busqueda[0].dataValues);
//     return res.status(200).send(busqueda);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

//!----prueba con axios a la API ----:
// router.get("/:idReceta", async (req, res) => {
//   const idReceta = req.params.idReceta;
//   try {
//     const axiado = await axios.get(
//       `https://api.spoonacular.com/recipes/${idReceta}1/information?apiKey=${MI_API_KEY}`
//     );
//     if (axiado.status >= 400) {
//       //revisar DB?
//     }
//     // console.log(axiado.data);
//     return res.status(200).send(axiado.data);
//   } catch (error) {
//     console.log(error.message);
//     res.status(401).send("Error en el get!!!!");
//   }
// });
