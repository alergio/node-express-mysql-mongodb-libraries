const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

const keys = require("./settings/keys");

app.set("key", keys.key);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server UP");
});

app.post("/login", (req, res) => {
  if (req.body.usuario == "admin" && req.body.pass == "12345") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: "7d",
    });
    res.json({
      message: "AUTENTICACION EXITOSA",
      token: token,
    });
  } else {
    res.json({
      message: "Usuario y/o psw incorrectas",
    });
  }
});

const verificacion = express.Router();

verificacion.use((req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  //   console.log(token);
  if (!token) {
    res.status(401).send({
      error: "es necesario un token de autenticacion",
    });
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
    console.log(token);
  }
  if (token) {
    jwt.verify(token, app.get("key"), (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: "El token no es valido",
        });
      } else {
        req.decoded = decoded;
        // console.log(decoded);
        next();
      }
    });
  }
});

app.get("/info", verificacion, (req, res) => {
  res.json("INFORMACION IMPORTANTE ENTREGADA");
});
