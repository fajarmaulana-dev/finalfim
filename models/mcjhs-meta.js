const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaSchema = new Schema({
  responses: { type: Array, required: true, default: [] },
  disMod: { type: Array, default: [false, false, false, false, false] },
  disLess: { type: Array, default: [false, false, false, false, false] },
  disDiag: { type: Array, default: [false, false] },
});

module.exports = mongoose.model("MCJHSMeta", metaSchema);
