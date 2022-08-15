const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //h Voy a tener que hacer que el id de estas recetas sea distinta a las id de la API.
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 10,
      },
    },
    steps: {
      type: DataTypes.TEXT,
    },
  });
};
