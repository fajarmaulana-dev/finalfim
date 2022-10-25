const HttpError = require("../models/http-error");
const MCJHSMeta = require("../models/mcjhs-meta");

const getMeta = async (req, res, next) => {
  let meta;
  try {
    meta = await MCJHSMeta.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching meta failed, please try again later.",
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
    const error = new HttpError(
      "Create contestant failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ meta: createdMeta });
};

const updateRes = async (req, res, next) => {
  const { responses } = req.body;
  let meta;
  try {
    temp = await MCJHSMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError(
      "Fetching meta failed, please try again later.",
      500
    );
    return next(error);
  }

  meta.responses = responses;
  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update meta",
      500
    );
    return next(error);
  }

  res.json({ meta: meta.toObject({ getters: true }) });
};

const updateMod = async (req, res, next) => {
  const { disMod } = req.body;
  let meta;
  try {
    temp = await MCJHSMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError(
      "Fetching meta failed, please try again later.",
      500
    );
    return next(error);
  }

  meta.disMod = disMod;
  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update meta",
      500
    );
    return next(error);
  }

  res.json({ meta: meta.toObject({ getters: true }) });
};

const updateLess = async (req, res, next) => {
  const { disLess } = req.body;
  let meta;
  try {
    temp = await MCJHSMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError(
      "Fetching meta failed, please try again later.",
      500
    );
    return next(error);
  }

  meta.disLess = disLess;
  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update meta",
      500
    );
    return next(error);
  }

  res.json({ meta: meta.toObject({ getters: true }) });
};

const updateDiag = async (req, res, next) => {
  const { disDiag } = req.body;
  let meta;
  try {
    temp = await MCJHSMeta.find({});
    meta = temp[0];
  } catch (err) {
    const error = new HttpError(
      "Fetching meta failed, please try again later.",
      500
    );
    return next(error);
  }

  meta.disDiag = disDiag;
  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update meta",
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
    const error = new HttpError(
      "Fetching meta failed, please try again later.",
      500
    );
    return next(error);
  }
  meta.responses = [];
  meta.disMod = [false, false, false, false, false];
  meta.disLess = [false, false, false, false, false];
  meta.disDiag = [false, false];
  try {
    await meta.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update meta",
      500
    );
    return next(error);
  }

  res.json({ meta: meta.toObject({ getters: true }) });
};

exports.getMeta = getMeta;
exports.createMeta = createMeta;
exports.updateRes = updateRes;
exports.updateMod = updateMod;
exports.updateLess = updateLess;
exports.updateDiag = updateDiag;
exports.resetMeta = resetMeta;
