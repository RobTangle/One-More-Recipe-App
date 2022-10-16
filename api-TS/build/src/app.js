"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((0, cors_1.default)());
// app.use("/users", usersRouter);
app.get("/", (req, res) => {
    console.log(`Hola!`);
    return res.status(200).send(`Acá estoy!!!!`);
});
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
