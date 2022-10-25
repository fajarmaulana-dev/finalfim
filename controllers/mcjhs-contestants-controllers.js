const HttpError = require("../models/http-error");
const MCJHSContestant = require("../models/mcjhs-contestants");

const getAllContestants = async (req, res, next) => {
  let contestant;
  try {
    contestant = await MCJHSContestant.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching contestant failed, please try again later.",
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
    contestant = await MCJHSContestant.findById(contestantId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a contestant.",
      500
    );
    return next(error);
  }

  if (!contestant) {
    const error = new HttpError(
      "Could not find contestant for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ contestant: contestant.toObject({ getters: true }) });
};

const createContestant = async (req, res, next) => {
  const { name, color } = req.query;
  const createdContestant = new MCJHSContestant({
    name,
    color,
    score: 100,
  });
  try {
    await createdContestant.save();
  } catch (err) {
    const error = new HttpError(
      "Create contestant failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ contestant: createdContestant });
};

const updateContestant = async (req, res, next) => {
  const { scores } = req.body;

  let contestant;
  try {
    contestant = await MCJHSContestant.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching contestant failed, please try again later.",
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
      "Something when wrong, could not update contestant",
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
    await MCJHSContestant.updateMany({}, [{ $set: { score: 100 } }]);
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update contestant",
      500
    );
    return next(error);
  }

  let contestant;
  try {
    contestant = await MCJHSContestant.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching contestant failed, please try again later.",
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
