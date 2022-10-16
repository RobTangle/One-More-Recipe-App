import { userIntroducedProhibitedSimbols } from "../auxiliaryFns/recipe-AuxFns";
import { IRecipeFromDB } from "../types/recipe-types";
import {
  isEmptyString,
  isStringBetween1AndXCharsLong,
  isUndefinedOrNull,
} from "./genericValidators";

//! RECIPE VALIDATORS:
// For when the user posts a new recipe:

// CHECK NEW RECIPE
export function checkNewRecipe(bodyFromReq: any): IRecipeFromDB {
  console.log(`Checking new recipe...`);
  try {
    const { title, summary, healthScore, steps, image, diets } = bodyFromReq;
    let newRecipe: IRecipeFromDB = {
      title: checkTitle(title),
      summary: checkSummary(summary),
      healthScore: checkHealthScore(healthScore),
      steps: checkSteps(steps),
      // image: checkImage(image),
      // diets: checkDiets(diets),
      image: image,
      diets: diets,
    };
    return newRecipe;
  } catch (error: any) {
    console.log(`Error en checkNewRecipe. ${error.message}`);
    throw new Error(error.message);
  }
}

export function checkTitle(titleFromReq: any): string {
  try {
    if (!isStringBetween1AndXCharsLong(100, titleFromReq)) {
      throw new Error(`Title "${titleFromReq}" is invalid.`);
    }
    if (userIntroducedProhibitedSimbols(titleFromReq)) {
      throw new Error(`The title has prohibited simbols.`);
    }
    return titleFromReq.toLowerCase();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function checkSummary(summaryFromReq: any): string {
  try {
    if (!isStringBetween1AndXCharsLong(500, summaryFromReq)) {
      throw new Error(
        `The summary is invalid. Summary length: ${summaryFromReq?.length}.`
      );
    }
    if (userIntroducedProhibitedSimbols(summaryFromReq)) {
      throw new Error(`The summary has invalid simbols`);
    }
    return summaryFromReq;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function checkHealthScore(healthScoreFromReq: any): number | undefined {
  try {
    if (
      isUndefinedOrNull(healthScoreFromReq) ||
      isEmptyString(healthScoreFromReq)
    ) {
      return undefined;
    }
    if (typeof healthScoreFromReq !== "number") {
      throw new Error(
        `Health score ${healthScoreFromReq} must be of type number.`
      );
    }
    if (healthScoreFromReq > 100 || healthScoreFromReq < 0) {
      throw new Error(
        `Health Score must be a number between 0 and 100. You introduced ${healthScoreFromReq}.`
      );
    }
    return healthScoreFromReq;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function checkSteps(stepsFromReq: any): string | undefined {
  try {
    if (isUndefinedOrNull(stepsFromReq) || isEmptyString(stepsFromReq)) {
      return undefined;
    }
    //! if (userIntroducedProhibitedSimbols(stepsFromReq)) {
    //   throw new Error(`Invalid simbols detected.`);
    // }
    if (isStringBetween1AndXCharsLong(3000, stepsFromReq)) {
      return stepsFromReq;
    }
  } catch (error: any) {
    throw new Error(`Invalid steps.`);
  }
}
