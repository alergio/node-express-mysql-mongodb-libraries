const express = require("express");
const app = express();

// invocamos express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

//setear el motor de plantillas ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("inicio");
});

app.get("/contacto", (req, res) => {
  res.render("contacto");
});

app.listen(3000, () => {
  console.log("sv up");
});
