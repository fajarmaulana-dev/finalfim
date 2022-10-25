const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("MCJHSContestant", mainSchema);
