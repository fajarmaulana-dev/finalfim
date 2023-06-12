const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  color: { type: String },
  point: { type: Number },
});

exports.EPart = mongoose.model("EPart", schema);
exports.JPart = mongoose.model("JPart", schema);
exports.SPart = mongoose.model("SPart", schema);
