const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  if (user == "admin" && password == "12345") {
    let passwordHash = await bcrypt.hash(password, 8);
    res.json({
      message: "AUTENTICACION EXITOSA!",
      passwordHash: passwordHash,
      password: password,
    });
  } else {
    res.status(401).json({
      message: "INGRESE CORRECTAMENTE SUS CREDENCIALES",
    });
  }
});

app.get("/compare", async (req, res) => {
  let hashSaved =
    "$2a$08$4Qqj05tNgQktc3EF0cuWduNLMiEYE.z6hgsXs.V7ifAYC5T1d3i3q";
  let compare = await bcrypt.compare("12345", hashSaved);
  if (compare) {
    res.json("OK");
  } else {
    res.json("BAD");
  }
});

app.listen(3000, () => {
  console.log("server up");
});
