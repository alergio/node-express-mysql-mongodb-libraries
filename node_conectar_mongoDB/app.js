const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1/mongo1_curso";

mongoose
  .connect(url, {})
  .then(() => console.log("CONECTADO A MONGO"))
  .catch((e) => console.log("El error de conexion es: " + e));

const personaSchema = mongoose.Schema(
  {
    nombre: String,
    edad: Number,
    pais: String,
  },
  { versionKey: false }
);

const PersonaModel = mongoose.model("personas", personaSchema);

// mostrar

const mostrar = async () => {
  const personas = await PersonaModel.find();
  console.log(personas);
};

// mostrar();

//crear
const crear = async () => {
  const persona = new PersonaModel({
    nombre: "ALBERTO",
    edad: 39,
    pais: "ESPANA",
  });
  const resultado = await persona.save();
  console.log(resultado);
};

// crear();

// editar

const actualizar = async (id) => {
  const persona = await PersonaModel.updateOne(
    { _id: id },
    {
      $set: {
        nombre: "ALBERTO MODIFICADO",
        pais: "ESPANA MODIFICADO",
      },
    }
  );
};

// actualizar("6563f34ea9f9afa3d6afaf6b");

// eliminar

const eliminar = async (id) => {
  const persona = await PersonaModel.deleteOne({ _id: id });
  console.log(persona);
};

// eliminar("6563efd7fa7f7ba7d321dc31");
