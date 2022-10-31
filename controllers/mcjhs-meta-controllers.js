const HttpError = require("../models/http-error");
const MCJHSMeta = require("../models/mcjhs-meta");

const getMeta = async (req, res, next) => {
  let meta;
  try {
    meta = await MCJHSMeta.find({});
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
  const createdMeta = new MCJHSMeta({
    responses: [],
    disMod: [false, false, false, false, false],
    disLess: [false, false, false, false, false],
    disDiag: [false, false],
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
  const { responses, disMod, disLess, disDiag } = req.body;
  let meta;
  try {
    temp = await MCJHSMeta.find({});
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
    temp = await MCJHSMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError("Gagal mereset meta, silakan coba lagi", 500);
    return next(error);
  }
  meta.responses = [];
  meta.disMod = [false, false, false, false, false];
  meta.disLess = [false, false, false, false, false];
  meta.disDiag = [false, false];
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
