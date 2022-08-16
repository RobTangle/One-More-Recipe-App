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
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    steps: {
      type: DataTypes.TEXT,
    },
    // diet: {}
    //Tengo que usar ese método tipo addModels() para asociar dietas a una receta? Entra como argumento a ese método un array de PKs. Y los PK tienen que ser los de las dietas!
    //Le digo onda: si dietArray.length > 0, entonces pasá los PK de ese array como argumento del método que tengo que usar para asociar!! Creo que re va!!!!
    // podría recibir un número que represente el id de la dieta en cuestión,
    //Al crear las relaciones con los Recipe.hasMany(Diet);  Diet.hasMany(Recipe); se crean automáticamente unos métodos que son para relacionar las dos: set/addModels()
    //Cuando me lleguen los datos por el req.body, chequeo si me enviaron las PK.
    // o un array de números?
    // después podría hacer un filtrado de todas las recetas que tienen en su propiedad diet ciertos números, y así filtrar las recetas según sus dietas. (Reviso el array y listo)
    //podría recibir los nombres de las dietas en una frase separada por espacios?
  });
};
