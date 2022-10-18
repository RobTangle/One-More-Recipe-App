"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSteps = exports.checkHealthScore = exports.checkSummary = exports.checkTitle = exports.checkNewRecipe = void 0;
const recipe_AuxFns_1 = require("../auxiliaryFns/recipe-AuxFns");
const genericValidators_1 = require("./genericValidators");
//! RECIPE VALIDATORS:
// For when the user posts a new recipe:
// CHECK NEW RECIPE
function checkNewRecipe(bodyFromReq) {
    console.log(`Checking new recipe...`);
    try {
        const { title, summary, healthScore, steps, image, diets } = bodyFromReq;
        let newRecipe = {
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
    }
    catch (error) {
        console.log(`Error en checkNewRecipe. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.checkNewRecipe = checkNewRecipe;
function checkTitle(titleFromReq) {
    try {
        if (!(0, genericValidators_1.isStringBetween1AndXCharsLong)(100, titleFromReq)) {
            throw new Error(`Title "${titleFromReq}" is invalid.`);
        }
        if ((0, recipe_AuxFns_1.userIntroducedProhibitedSimbols)(titleFromReq)) {
            throw new Error(`The title has prohibited simbols.`);
        }
        return titleFromReq.toLowerCase();
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.checkTitle = checkTitle;
function checkSummary(summaryFromReq) {
    try {
        if (!(0, genericValidators_1.isStringBetween1AndXCharsLong)(500, summaryFromReq)) {
            throw new Error(`The summary is invalid. Summary length: ${summaryFromReq === null || summaryFromReq === void 0 ? void 0 : summaryFromReq.length}.`);
        }
        if ((0, recipe_AuxFns_1.userIntroducedProhibitedSimbols)(summaryFromReq)) {
            throw new Error(`The summary has invalid simbols`);
        }
        return summaryFromReq;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.checkSummary = checkSummary;
function checkHealthScore(healthScoreFromReq) {
    try {
        if ((0, genericValidators_1.isUndefinedOrNull)(healthScoreFromReq) ||
            (0, genericValidators_1.isEmptyString)(healthScoreFromReq)) {
            return undefined;
        }
        if (typeof healthScoreFromReq !== "number") {
            throw new Error(`Health score ${healthScoreFromReq} must be of type number.`);
        }
        if (healthScoreFromReq > 100 || healthScoreFromReq < 0) {
            throw new Error(`Health Score must be a number between 0 and 100. You introduced ${healthScoreFromReq}.`);
        }
        return healthScoreFromReq;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.checkHealthScore = checkHealthScore;
function checkSteps(stepsFromReq) {
    try {
        if ((0, genericValidators_1.isUndefinedOrNull)(stepsFromReq) || (0, genericValidators_1.isEmptyString)(stepsFromReq)) {
            return undefined;
        }
        //! if (userIntroducedProhibitedSimbols(stepsFromReq)) {
        //   throw new Error(`Invalid simbols detected.`);
        // }
        if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(3000, stepsFromReq)) {
            return stepsFromReq;
        }
    }
    catch (error) {
        throw new Error(`Invalid steps.`);
    }
}
exports.checkSteps = checkSteps;
