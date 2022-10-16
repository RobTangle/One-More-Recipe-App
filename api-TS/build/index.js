"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const diets = [
            "dairyFree",
            "gluten free",
            "ketogenic",
            "lacto ovo vegetarian",
            "lowFodmap",
            "paleo",
            "pescetarian",
            "primal",
            "vegan",
            "vegetarian",
            "whole 30",
        ];
        diets.forEach((element) => __awaiter(void 0, void 0, void 0, function* () { return yield models_1.default.Diet.create({ name: element }); }));
        console.log(`${diets.length} dietas se han precargado`);
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
    });
});
