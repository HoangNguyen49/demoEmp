const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  phone: String,
  role: String,
});

module.exports = mongoose.model("emps", empSchema);