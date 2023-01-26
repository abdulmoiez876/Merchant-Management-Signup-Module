const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require('dotenv').config();

const userController = require("./controllers/userController");
const { mongoose } = require("./db");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(process.env.PORT || 8000, () => console.log("Connection Successful"));

app.use("/user", userController);