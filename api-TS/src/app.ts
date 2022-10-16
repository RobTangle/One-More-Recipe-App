const morgan = require("morgan");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const routes = require("./routes/index");
app.use("/", routes);
// app.use("/users", usersRouter);
// app.get("/", (req, res) => {
//   console.log(`Hola!`);
//   return res.status(200).send(`Acá estoy!!!!`);
// });

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
