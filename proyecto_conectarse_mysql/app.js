const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  database: "el_descubierto",
  user: "root",
  password: "rootadmin123",
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("SUCCESFULL CONNECTION");
  }
});

connection.query("SELECT * from ciudad", (error, results, fields) => {
  if (error) throw error;

  //   results.forEach((result) => {
  //     console.log(result);
  //   });

  console.log(results);
});

connection.end();
