const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const connection = require("../database/db");
const { promisify } = require("util");
const { log } = require("console");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const registerData = {
      name: req.body.name,
      user: req.body.user,
      pass: req.body.pass,
    };

    let passHash = await bcryptjs.hash(registerData.pass, 8);
    registerData.pass = passHash;

    connection.query(
      "INSERT INTO users SET ?",
      registerData,
      (err, results) => {
        if (err) {
          console.log("Error en la query " + err);
        }
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log("Error " + error);
  }
};

//procedimiento para el login
exports.login = async (req, res) => {
  try {
    const loginData = {
      user: req.body.user,
      pass: req.body.pass,
    };

    if (!loginData.user || !loginData.pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y/o password",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      connection.query(
        "SELECT * FROM users WHERE user = ?",
        [loginData.user],
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
            // inicio de sesion OK
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            // console.log(
            //   "TOKEN: " + token + " para el usuario: " + loginData.user
            // );

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };

            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Conexion exitosa",
              alertMessage: "Login Correcto",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: "",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log("Error en el login " + error);
  }
};

// autenticacion

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificated = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      connection.query(
        "SELECT * FROM users WHERE id = ?",
        [decodificated.id],
        (err, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      log("Error decodificando el token " + error);
      return next();
    }
  } else {
    res.redirect("/login");
  }
};

// logout

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
