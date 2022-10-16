import { Model } from "sequelize";
import { IDiet } from "../types/diet-types";
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: any, DataTypes: any) => {
  class Diet extends Model<IDiet> implements IDiet {
    name!: string;

    static associate(models: any) {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      // define association here

      Diet.belongsToMany(models.Recipe, { through: "DietsXRecipes" });
    }
  }
  Diet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Diet",
    }
  );
  return Diet;
};
