const express = require("express");
const app = express();

// invocamos a la conexion para la db
const connection = require("./database/db");

//AdminBro
const AdminBro = require("admin-bro");
const expressAdminBro = require("@admin-bro/express");
const mongooseAdminBro = require("@admin-bro/mongoose");

// Modelos
const User = require("./models/User");
const Post = require("./models/Post");

AdminBro.registerAdapter(mongooseAdminBro);
const AdminBroOptions = { resources: [User, Post] };

const adminBro = new AdminBro(AdminBroOptions);
const router = expressAdminBro.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

app.get("/", (req, res) => {
  res.send("F");
});

app.listen(3000, () => {
  console.log("sv up");
});
