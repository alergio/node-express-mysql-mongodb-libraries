const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

// seteamos el motor de plantillas
app.set("view engine", "ejs");

//seteamos la carpeta public para archivos estaticos
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//seteamos las variables de entorno
dotenv.config({ path: "./env/.env" });

//seteamos las cookies
app.use(cookieParser());

// llamar al router
app.use("/", require("./routes/router"));

// para eliminar el cache y que no se pueda volver con el boton de back al hacer logout
// enrealidad esto no me anduvo en chrome, lo q me anduvo fue la validacion del lado del cliente
app.use(function (req, res, next) {
  if (!req.user) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
  }
  next();
});

app.listen(3000, () => {
  console.log("sv up");
});
