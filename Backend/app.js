require("dotenv").config(); /* Require DotEnv */
//
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//
const { log } = console;

const app = express();

// set middleware
app.use(bodyParser.urlencoded({ extended: false }));

//
app.route("/").get((req, res) => {
  res.send("Backend");
});

app.listen(process.env.PORT || 3000, () =>
  log("Server Has Started On Port! Happy Coding Stroge")
);
