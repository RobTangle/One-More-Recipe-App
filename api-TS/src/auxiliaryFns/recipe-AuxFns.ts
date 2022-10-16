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
