"use strict";
//FUNCIONES AUXILIARES RE RECIPE-ROUTE:
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIntroducedProhibitedSimbols = void 0;
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
