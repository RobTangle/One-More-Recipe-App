export interface IRecipe {
  id?: string;
  title: string;
  summary: string;
  healthScore?: number;
  steps?: string;
  image?: string;
}
