const express = require("express");
const Sequelize = require("sequelize");
const app = express();

//conexion a la bd
const sequelize = new Sequelize("postres_database", "root", "rootadmin123", {
  host: "localhost",
  dialect: "mysql",
});

//definimos el modelo
const postresModel = sequelize.define("postres", {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  nombre: Sequelize.STRING,
  calorias: Sequelize.INTEGER,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONEXION EXITOSA A LA BD");
  })
  .catch((error) => {
    console.log("ERROR EN LA BD " + error);
  });

postresModel
  .findAll({ attributes: ["nombre", "calorias"] })
  .then((postres) => {
    const resultados = JSON.stringify(postres);
    console.log(resultados);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("sv up");
});
