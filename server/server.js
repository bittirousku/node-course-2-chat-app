require("./config/config.js");

const path = require("path");

const bodyParsers = require("body-parser");
const express = require("express");

const publicPath = path.join(__dirname, "../public");


let app = express();
const port = process.env.PORT;


app.use(express.static(publicPath));
app.get("/", (req, res) => {
  
});


// Start server
app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
