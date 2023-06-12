const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  answerer: { type: Array },
  watcher: { type: Array },
  reducer: { type: Array },
});

exports.EMeta = mongoose.model("EMeta", schema);
exports.JMeta = mongoose.model("JMeta", schema);
exports.SMeta = mongoose.model("SMeta", schema);
