const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  index: { type: Number },
  answer: { type: String },
  color: { type: String },
  point: { type: Number },
  question: { type: String },
  disMin: { type: Array },
  disTemp: { type: Array },
});

exports.EQuest = mongoose.model("EQuest", schema);
exports.JQuest = mongoose.model("JQuest", schema);
exports.SQuest = mongoose.model("SQuest", schema);
