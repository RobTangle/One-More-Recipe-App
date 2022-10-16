import { Model } from "sequelize";
import { IRecipe } from "../types/recipe-types";
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: any, DataTypes: any) => {
  class Recipe extends Model<IRecipe> implements IRecipe {
    id?: string;
    title!: string;
    summary!: string;
    healthSchore?: number;
    steps?: string;
    image?: string;
  }
  Recipe.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      summary: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      healthScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      steps: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 3000],
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
