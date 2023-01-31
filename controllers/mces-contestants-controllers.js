const HttpError = require("../utils/http-error");
const MCESContestant = require("../models/mces-contestants");

const getAllContestants = async (req, res, next) => {
  let contestant;
  try {
    contestant = await MCESContestant.find({});
  } catch (err) {
    const error = new HttpError(
      "Gagal memperoleh data peserta, silakan coba lagi",
      500
    );
    return next(error);
  }
  res.json({
    contestant: contestant.map((q) => q.toObject({ getters: true })),
  });
};

const getContestantById = async (req, res, next) => {
  const contestantId = req.params.qid;
  let contestant;

  try {
    contestant = await MCESContestant.findById(contestantId);
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }

  if (!contestant) {
    const error = new HttpError(
      "Tidak dapat menemukan peserta yang diminta",
      404
    );
    return next(error);
  }

  res.json({ contestant: contestant.toObject({ getters: true }) });
};

const createContestant = async (req, res, next) => {
  const { name, color } = req.query;
  const createdContestant = new MCESContestant({
    name,
    color,
    score: 100,
  });
  try {
    await createdContestant.save();
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }
  res.status(201).json({ contestant: createdContestant });
};

const updateContestant = async (req, res, next) => {
  const { scores } = req.body;

  let contestant;
  try {
    contestant = await MCESContestant.find({});
  } catch (err) {
    const error = new HttpError(
      "Kesalahan server, tidak dapat mengakses data peserta",
      500
    );
    return next(error);
  }

  for (let i = 0; i < contestant.length; i++) {
    contestant[i].score = scores[i];
  }

  try {
    for (i = 0; i < contestant.length; i++) {
      await contestant[i].save();
    }
  } catch (err) {
    const error = new HttpError(
      "Kesalahan server, tidak dapat memperbarui data peserta",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ contestant: contestant.map((q) => q.toObject({ getters: true })) });
};

const resetContestants = async (req, res, next) => {
  try {
    await MCESContestant.updateMany({}, [{ $set: { score: 100 } }]);
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat mereset data peserta, silakan coba lagi",
      500
    );
    return next(error);
  }

  let contestant;
  try {
    contestant = await MCESContestant.find({});
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat mereset data peserta, silakan coba lagi",
      500
    );
    return next(error);
  }
  res.json({
    contestant: contestant.map((q) => q.toObject({ getters: true })),
  });
};

exports.getContestantById = getContestantById;
exports.createContestant = createContestant;
exports.updateContestant = updateContestant;
exports.getAllContestants = getAllContestants;
exports.resetContestants = resetContestants;
