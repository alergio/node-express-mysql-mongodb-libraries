const express = require("express");

const app = express();

app.use(express.static("public"));
app.use("/recursos", express.static(__dirname + "/public"));
console.log(__dirname);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("server up");
});
