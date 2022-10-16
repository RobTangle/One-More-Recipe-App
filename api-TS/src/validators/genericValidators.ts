//GENERIC VALIDATORS:

// IS STRING:
export function isString(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return true;
}

// IS VALID STRING:
export function isValidString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length > 0) {
    return true;
  } else {
    return false;
  }
}

// IS EMPTY STRING:
export function isEmptyString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 0) {
    return true;
  } else {
    return false;
  }
}

// funcion auxiliar para chequear strings y su largo
export function isStringBetween1AndXCharsLong(
  xChars: number,
  argumento: any
): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= xChars
  ) {
    return true;
  }
  return false;
}

export function isStringBetween1And50CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length > 0 &&
    argumento.length <= 50
  ) {
    return true;
  } else {
    return false;
  }
}

// is UNDEFINEDorNULL:
export function isUndefinedOrNull(argumento: any): boolean {
  if (argumento === undefined || argumento === null) {
    return true;
  }
  return false;
}

// IS VALID ID
export function isValidId(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= 50
  ) {
    return true;
  }
  return false;
}
