const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

const bcryptjs = require("bcryptjs");

const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const connection = require("./database/db");

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//registracion
app.post("/register", async (req, res) => {
  const registerData = {
    user: req.body.user,
    name: req.body.name,
    rol: req.body.rol,
    pass: req.body.pass,
  };

  let passwordHash = await bcryptjs.hash(registerData.pass, 8);
  registerData.pass = passwordHash;

  connection.query(
    "INSERT INTO users SET ?",
    registerData,
    async (err, results) => {
      if (err) {
        console.log("Error registrandose " + err);
      } else {
        res.render("register", {
          alert: true,
          alertTitle: "Registration",
          alertMessage: "Succesfull Registration",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});

//autenticacion
app.post("/auth", async (req, res) => {
  const loginData = {
    user: req.body.user,
    pass: req.body.pass,
  };

  passwordHaash = await bcryptjs.hash(loginData.pass, 8);

  if (loginData.user && loginData.pass) {
    connection.query(
      "SELECT * FROM users Where user = ?",
      loginData.user,
      async (err, results) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(loginData.pass, results[0].pass))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o password incorrectas",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].name;
          res.render("login", {
            alert: true,
            alertTitle: "Conexion Correcta",
            alertMessage: "LOGIN EXITOSO",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "",
          });
        }
      }
    );
  } else {
    res.render("login", {
      alert: true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese un usuario y password",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: false,
      ruta: "login",
    });
  }
});

//auth pages
app.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      name: req.session.name,
    });
  } else {
    res.render("index", {
      login: false,
      name: "Debe iniciar sesion",
    });
  }
});

//logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(3000, (req, res) => {
  console.log("sv up");
});
