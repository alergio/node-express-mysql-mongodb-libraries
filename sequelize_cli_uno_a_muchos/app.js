const express = require("express");
const app = express();

const modeloCategoria = require("./models").Categoria;
const modeloProducto = require("./models").Producto;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// alta de categorias
app.post("/crearcategoria", (req, res) => {
  modeloCategoria
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

// alta de productos
app.post("/crearproducto", (req, res) => {
  modeloProducto
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

// mostrar productos
app.get("/mostrarproductos", (req, res) => {
  modeloProducto
    .findAll({
      include: [{ model: modeloCategoria }],
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

//borrar producto
app.delete("/borrarproducto/:id", (req, res) => {
  modeloProducto
    .destroy({
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

//modificar producto
app.put("/editarproducto/:id", (req, res) => {
  modeloProducto
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.listen(3000, () => {
  console.log("sv up");
});
