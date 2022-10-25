const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaSchema = new Schema({
  responses: { type: Array, required: true },
  disMod: { type: Array, required: true },
  disLess: { type: Array, required: true },
  disDiag: { type: Array, required: true },
});

module.exports = mongoose.model("MCESMeta", metaSchema);
