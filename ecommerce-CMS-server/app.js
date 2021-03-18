const env = process.env.NODE_ENV;
if (env !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const routes = require("./routes/index");
const errorHandling = require("./middlewares/errorHandling");
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandling);

module.exports = app;
