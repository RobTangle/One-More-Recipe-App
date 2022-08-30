const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //h Voy a tener que hacer que el id de estas recetas sea distinta a las id de la API.
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false, //! esto creo que puedo borrarlo
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
  });
};
