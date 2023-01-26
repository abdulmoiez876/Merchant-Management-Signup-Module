const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_STRING, (err) => {
  if (!err) {
    console.log("Database Connected Successfully.");
  } else {
    console.log(err.message);
  }
});

module.exports = mongoose;
