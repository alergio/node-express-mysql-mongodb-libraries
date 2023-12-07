const http = require("http");

const servidor = http.createServer((req, res) => {
  console.log("solicitud nueva");
  res.end("Hello world");
});

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
  console.log(`el server esta escuchando en el puerto ${PUERTO}...`);
});

const miUrl = new URL(
  "https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1"
);

let infoCursos = {
  programacion: [
    {
      id: 1,
      titulo: "Aprende Python",
      lenguaje: "python",
      vistas: 15000,
      nivel: "basico",
    },
    {
      id: 2,
      titulo: "Python intermedio",
      lenguaje: "python",
      vistas: 13553,
      nivel: "intermedio",
    },
    {
      id: 3,
      titulo: "Aprende JavaScript",
      lenguaje: "javascript",
      vistas: 102223,
      nivel: "basico",
    },
  ],
  matematicas: [
    {
      id: 1,
      titulo: "Aprende Calculo",
      tema: "calculo",
      vistas: 12427,
      nivel: "basico",
    },
    {
      id: 2,
      titulo: "Aprende Algebra",
      tema: "algebra",
      vistas: 15722,
      nivel: "intermedio",
    },
  ],
};

module.exports.infoCursos = infoCursos;
