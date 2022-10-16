import { Model } from "sequelize";
import { IDiet } from "../types/diet-types";
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: any, DataTypes: any) => {
  class Diet extends Model<IDiet> implements IDiet {
    name!: string;
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
