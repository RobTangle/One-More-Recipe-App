"use strict";
//GENERIC VALIDATORS:
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = exports.isUndefinedOrNull = exports.isStringBetween1And50CharsLong = exports.isStringBetween1AndXCharsLong = exports.isEmptyString = exports.isValidString = exports.isString = void 0;
// IS STRING:
function isString(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    return true;
}
exports.isString = isString;
// IS VALID STRING:
function isValidString(argumento) {
    if (typeof argumento === "string" && argumento.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isValidString = isValidString;
// IS EMPTY STRING:
function isEmptyString(argumento) {
    if (typeof argumento === "string" && argumento.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmptyString = isEmptyString;
// funcion auxiliar para chequear strings y su largo
function isStringBetween1AndXCharsLong(xChars, argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= xChars) {
        return true;
    }
    return false;
}
exports.isStringBetween1AndXCharsLong = isStringBetween1AndXCharsLong;
function isStringBetween1And50CharsLong(argumento) {
    if (typeof argumento === "string" &&
        argumento.length > 0 &&
        argumento.length <= 50) {
        return true;
    }
    else {
        return false;
    }
}
exports.isStringBetween1And50CharsLong = isStringBetween1And50CharsLong;
// is UNDEFINEDorNULL:
function isUndefinedOrNull(argumento) {
    if (argumento === undefined || argumento === null) {
        return true;
    }
    return false;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
// IS VALID ID
function isValidId(argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= 50) {
        return true;
    }
    return false;
}
exports.isValidId = isValidId;
