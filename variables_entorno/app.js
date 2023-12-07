const express = require("express");
const app = express();

require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("server on port " + port);
});

// tambien podemos setear la variable de entorno en las variables de entorno de windows
// y va a sobreescribir cualquier valor con el mismo nombre de variable que este en .env
