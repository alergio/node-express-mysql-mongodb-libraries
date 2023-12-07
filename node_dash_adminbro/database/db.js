const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1/base_adminbro";

mongoose
  .connect(uri, {})
  .then(() => console.log("CONECTADO A MONGO"))
  .catch((e) => console.log("El error de conexion es: " + e));

const connection = mongoose.connection;

module.exports = connection;
