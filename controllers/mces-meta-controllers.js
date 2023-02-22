const HttpError = require("../utils/http-error");
const MCESMeta = require("../models/mces-meta");

const getMeta = async (req, res, next) => {
  let meta;
  try {
    meta = await MCESMeta.find({});
  } catch (err) {
    const error = new HttpError(
      "Gagal mendapatkan data meta, silakan coba lagi",
      500
    );
    return next(error);
  }
  res.json({
    meta: meta.map((q) => q.toObject({ getters: true })),
  });
};

const createMeta = async (req, res, next) => {
  const createdMeta = new MCESMeta({
    responses: [],
    disMod: [false, false, false, false, false],
    disLess: [false, false, false, false, false],
    disDiag: [false, false],
    disBtn: [
      ["NA", "NA", "NA", "NA", "NA"],
      ["NA", "NA", "NA", "NA", "NA"],
      ["NA", "NA"],
    ],
  });
  try {
    await createdMeta.save();
  } catch (err) {
    const error = new HttpError("Gagal membuat meta, silakan coba lagi", 500);
    return next(error);
  }
  res.status(201).json({ meta: createdMeta });
};

const updateMeta = async (req, res, next) => {
  const { responses, disMod, disLess, disDiag, disBtn } = req.body;
  let meta;
  try {
    temp = await MCESMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat memperbarui meta, silakan coba lagi",
      500
    );
    return next(error);
  }

  meta.responses = responses;
  meta.disMod = disMod;
  meta.disLess = disLess;
  meta.disDiag = disDiag;
  meta.disBtn = disBtn;

  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat memperbarui meta, silakan coba lagi",
      500
    );
    return next(error);
  }

  res.json({ meta: meta.toObject({ getters: true }) });
};

const resetMeta = async (req, res, next) => {
  let meta;
  try {
    temp = await MCESMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError("Gagal mereset meta, silakan coba lagi", 500);
    return next(error);
  }
  meta.responses = [];
  meta.disMod = [false, false, false, false, false];
  meta.disLess = [false, false, false, false, false];
  meta.disDiag = [false, false];
  meta.disBtn = [
    ["NA", "NA", "NA", "NA", "NA"],
    ["NA", "NA", "NA", "NA", "NA"],
    ["NA", "NA"],
  ];

  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError("Gagal mereset meta, silakan coba lagi", 500);
    return next(error);
  }

  res.json({ meta: meta.toObject({ getters: true }) });
};

exports.getMeta = getMeta;
exports.createMeta = createMeta;
exports.updateMeta = updateMeta;
exports.resetMeta = resetMeta;
