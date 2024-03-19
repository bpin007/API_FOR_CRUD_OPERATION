const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  is_active: { type: Boolean, default: false },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
