"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./src/models"));
const config = require(__dirname + "/src/config/config.js");
const app = require("./src/app");
// sync({ alter: true })
// sync({ force: true })
models_1.default.sequelize.sync({ alter: true }).then(() => {
    app.listen(config.server.port, () => {
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
        console.log(`App listening on port ${config.server.port}`);
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
        // const diets = [
        //   "dairyFree",
        //   "gluten free",
        //   "ketogenic",
        //   "lacto ovo vegetarian",
        //   "lowFodmap",
        //   "paleo",
        //   "pescetarian",
        //   "primal",
        //   "vegan",
        //   "vegetarian",
        //   "whole 30",
        // ];
        // diets.forEach(async (element) => await db.Diet.create({ name: element }));
        // console.log(`${diets.length} dietas se han precargado`);
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
    });
});
