const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modifySchema = new Schema({
  index: { type: Number, required: true },
  value: { type: String, required: true },
  question: { type: String, required: true },
  score: { type: Number, required: true },
  bg: { type: String, required: true },
  border: { type: String, required: true },
  font: { type: String, required: true },
});

module.exports = mongoose.model("MCESQuest", modifySchema);
