const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));

//utilizamos el router
const router = require("./routers/router");
app.use(router.routes);

app.listen(3000, () => {
  console.log("sv up");
});
