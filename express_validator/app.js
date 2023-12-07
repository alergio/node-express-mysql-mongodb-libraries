const express = require("express");
const app = express();

const { body, validationResult } = require("express-validator");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post(
  "/registrar",
  [
    body("nya", "Ingrese un nombre y apellido").exists().isLength({ min: 5 }),
    body("email", "ingrese un email").exists().isEmail(),
    body("edad", "Ingrese una edad correcta").exists().isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({ errors: errors.array() });
    //   console.log(errors);
    // }

    if (!errors.isEmpty()) {
      //   console.log(req.body);
      const valores = req.body;
      const validaciones = errors.array();

      console.log(valores);
      console.log(validaciones);

      res.render("index", { validaciones: validaciones, valores: valores });
    } else {
      res.send("Validacion exitosa");
    }
  }
);

app.listen(3000, () => {
  console.log("sv on");
});
