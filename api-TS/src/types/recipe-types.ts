export interface IRecipeFromDB {
  id?: string; //! SI CAMBIO ESTO DEBERÍA ASEGURARME EN TODO EL CÓDIGO QUE LO MANIPULO COMO UN NÚMERO.
  title: string;
  summary: string;
  healthScore?: number;
  steps?: string;
  image?: string;
  diets?: string[];
}

export interface IRecipeFromApi {
  id: number;
  title: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  lowFodmap: boolean;
  healthScore: number;
  summary: string;
  dishTypes: string[];
  image: string;
  readyInMinutes: number;
  analyzedInstructions: IAnalyzedInstruction[];
  steps: IAnalyzedInstruction[];
  // steps: axiData.analyzedInstructions?.[0]?.steps, //Atención a este ?.chain!
  diets: string[];
}

export interface IRecipeFromDBPlusDietModel {
  id?: string; //! SI CAMBIO ESTO DEBERÍA ASEGURARME EN TODO EL CÓDIGO QUE LO MANIPULO COMO UN NÚMERO.
  title: string;
  summary: string;
  healthScore?: number;
  steps?: string;
  image?: string;
  diets: any[];
}

export interface IAnalyzedInstruction {
  name: string;
  steps: IStep[];
}

export interface IStep {
  number?: number;
  step: string;
  ingredients?: any[];
  equipment?: any[];
}
