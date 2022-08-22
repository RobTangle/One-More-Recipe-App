const { Router } = require("express");
const { Recipe } = require("../db");
// const Recipe = require("../models/Recipe");
// const { MY_API_KEY } = process.env;
const MI_API_KEY = "08627e517b4943fe9b66893317a91541";
const axios = require("axios");
const { Op } = require("sequelize");

const router = Router();

const addRecipeInfoTrue = "addRecipeInformation=true";
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

//* --- GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Incluir los tipos de dieta asociados (esto ya deberia venir en la data)
router.get("/:idReceta", async (req, res) => {
  console.log("Entré al get /:idReceta");
  const idReceta = req.params.idReceta;
  if (!idReceta) {
    return res.status(404).send("Debe ingresar por params el id de la receta");
  }
  try {
    let recetaEncontrada;
    if (idReceta.length > 31) {
      //(si la PK es UUIDV4):
      console.log("Buscando recenta en DB: idReceta.length > 31");
      recetaEncontrada = await Recipe.findByPk(idReceta);
    }
    if (!recetaEncontrada) {
      //(si no encuentro la receta en la DB, chequeo la API por si las dudas...:)
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MI_API_KEY}`
      );
      console.log("Receta buscada en API");
      return res.status(200).send(axiado.data);
    }
    console.log("Devolviendo buscada en DB..:");
    return res.status(200).send(recetaEncontrada);
  } catch (error) {
    return res.send(error.message);
  }
});

//* --- POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//? Cómo relaciono sus tipos de dietas?

router.post("/", async (req, res) => {
  const { title, summary, healthScore, diet, dietId } = req.body;
  if (!title || !summary) {
    console.log("Title o summary no ingresados!");
    return res.status(400).send("title and summary are mandatory");
  }
  try {
    //agregar a la db:
    const data = { title, summary, healthScore, diet };
    const newRecipe = await Recipe.create(data);
    await newRecipe.addDiet(dietId); //! probando setear FK
    console.log("Receta creada!!");
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log("Error al intentar crear la receta!!");
    return res.status(402).send(error.message);
  }
});

//* --- GET /recipes?name="...":
//- hacer el get con/sin query con suma de API y DB:

router.get("/", async (req, res) => {
  const { query, diet } = req.query;
  console.log(`Soy query: ${query}`);
  console.log(`Soy diet: ${diet} y mi .length es: ${diet.length}`);
  console.log(`Soy el req.query: ${req.query} y mi length es: ${diet.length}`);
  let queryToURL = fromQueryToURL(req.query);
  let fromDB = [];
  let concatAPIyDB = [];
  console.log("Entré en el get '/'");
  console.log(`Soy el queryToURL: ${queryToURL}`);
  console.log(`queryToURL.length: ${queryToURL.length}`);
  try {
    // si me envian query y diet válidos...:
    if (query && query.length > 1 && diet && diet.length > 1) {
      console.log("ENtré al QUERY y DIET son VÁLIDOS");
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
      );
      console.log(axiado.data.results);
      console.log(
        `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
      );
      let fromDB = await Recipe.findAll({
        where: {
          title: query,
          diet: diet,
        },
      });
      console.log(fromDB);

      concatAPIyDB = [...fromDB, ...axiado.data.results];
      console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
      console.log(`retornando concatAPIyDB: ${concatAPIyDB}`);
      return res.status(200).send(concatAPIyDB);
    }
    if (query && query.length > 1) {
      console.log(
        "req.query.query existe y es su length es mayor a 1.. buscando fromDB con ese title:"
      );
      fromDB = await Recipe.findAll({
        where: { title: query },
      });
      console.log(`Soy fromDB: ${fromDB}`);
      console.log(`Soy fromDB.length: ${fromDB.length}`);

      console.log(`Buscar en API..`);
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
      );
      console.log(
        `Soy axiado.result.data.length ${axiado.data.results.length}`
      );
      console.log(`Soy axiado.result.data: ${axiado.data.results}`);
      concatAPIyDB = [...fromDB, ...axiado.data.results];
      return res.status(200).send(concatAPIyDB);
    }
    if (diet && diet.length > 1) {
      console.log("Entré al (diet && diet.length > 1)");
      fromDB = await Recipe.findAll({
        where: { diet: diet },
      });
      console.log(`Soy fromDB: ${fromDB}`);

      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
      );
      console.log(
        `Soy axiado.result.data.length ${axiado.data.results.length}`
      );
      console.log(`Soy axiado.result.data: ${axiado.data.results}`);
      concatAPIyDB = [...fromDB, ...axiado.data.results];
      return res.status(200).send(concatAPIyDB);
    } else {
      console.log(
        `Entro al else final si no me ingresan title ni diet o son de 1 caracter... `
      );
      fromDB = await Recipe.findAll();
      console.log(`fromDB.length: ${fromDB.length} `);
      let axiado = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
      );
      console.log(`axiado.data.length: ${axiado.data.length}`);
      concatAPIyDB = [...fromDB, ...axiado.data.results];
      console.log(`concatAPIyDB.length: ${concatAPIyDB.length}`);
      return res.status(204).send(concatAPIyDB);
    }
  } catch (error) {
    console.log(
      `https://api.spoonacular.com/recipes/complexSearch?${addRecipeInfoTrue}&${queryToURL}apiKey=${MI_API_KEY}`
    );
    console.log("ERROR ACÄ!!!: ", error.message);
    return res.send(error.message);
  }
});

module.exports = router;

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
