const express = require("express");
const { matematicas } = require("../datos/cursos.js").infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {
  res.send(JSON.stringify(matematicas));
});

module.exports = routerMatematicas;
