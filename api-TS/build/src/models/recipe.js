"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
    class Recipe extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Recipe.belongsToMany(models.Diet, { through: "DietsXRecipes" });
        }
    }
    Recipe.init({
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
    }, {
        sequelize,
        modelName: "Recipe",
    });
    return Recipe;
};
