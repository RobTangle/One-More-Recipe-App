// import {
//   callBackFilter,
//   orderByHealthScore,
//   orderByHealthScoreInvert,
//   orderByTitleInvertExp,
//   orderByTitleExp,
//   compararTituloAsc,
//   compararTituloDes,
//   compareHealthScoreAsc,
//   compareHealthScoreDes,
//   compareKeyDes,
//   compareKeyAsc,
// } from "../";

export function compareKeyAsc(key) {
  function compare(a, b) {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  }
  return compare;
}

export function compareKeyDes(key) {
  function compare(a, b) {
    if (a[key] < b[key]) {
      return 1;
    } else if (a[key] > b[key]) {
      return -1;
    } else {
      return 0;
    }
  }
  return compare;
}

export const compararTituloAsc = compareKeyAsc("title");
export const compararTituloDes = compareKeyDes("title");
export const compareHealthScoreAsc = compareKeyAsc("healthScore");
export const compareHealthScoreDes = compareKeyDes("healthScore");

export function orderByTitleExp(array, cb) {
  console.log(
    "Se invocó a orderByTitleExp con este array como argumento: ",
    array
  );
  if (Array.isArray(array)) {
    let sortedArray = array.sort(compararTituloAsc);
    let copySortedArray = [...sortedArray];
    cb(copySortedArray);
  } else {
    console.log(
      "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
    );
  }
}

export function orderByTitleInvertExp(array, cb) {
  console.log(
    "Se invocó a orderByTitleInvertExp con este array como argumento: ",
    array
  );
  if (Array.isArray(array)) {
    let sortedArray = array.sort(compararTituloDes);
    let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
    cb(copySortedArray);
    // console.log(
    //   "el localState después de haber sido sorteado por title",
    //   localState
    // );
  } else {
    console.log(
      "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
    );
  }
}

//h--- Ordenar por healthScore:

export function orderByHealthScore(array, cb) {
  console.log(
    "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
    array
  );
  if (Array.isArray(array)) {
    let sortedArray = array.sort(compareHealthScoreAsc);
    let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
    cb(copySortedArray);
    // console.log("el localState después de haber sido sorteado", localState);
  } else {
    console.log(
      "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
    );
  }
}

export function orderByHealthScoreInvert(array, cb) {
  console.log(
    "Se invocó a orderByHealthScoreInvert con este array como argumento: ",
    array
  );
  if (Array.isArray(array)) {
    let sortedArray = array.sort(compareHealthScoreDes);
    let copySortedArray = [...sortedArray]; //creo una nueva dirección de memoria para poder pasarle al setLocalState y que no piense que es el mismo array que antes.
    cb(copySortedArray);
    // console.log(
    //   "el localState después de haber sido sorteado invert",
    //   localState
    // );
  } else {
    console.log(
      "array NO EXISTE en orderByHealthScoreInvert!" //!cambiar esto ya que array siempre va a existir. array.length > 0 podría ser una buena creo
    );
  }
}

//h--- Filter by diets:

export function callBackFilter(receta, diet) {
  console.log(`callBackFilter: receta = ${receta} y diet = ${diet}`);
  if (
    diet === "vegetarian" ||
    diet === "vegan" ||
    diet === "glutenFree" ||
    diet === "dairyFree" ||
    diet === "lowFodmap"
  ) {
    if (receta[diet] && receta[diet] === true) {
      return true;
    }
  }
  if (receta.diets && receta.diets.includes(diet)) {
    return true;
  }
  if (receta.diet && receta.diet.includes(diet)) {
    return true;
  }
}
