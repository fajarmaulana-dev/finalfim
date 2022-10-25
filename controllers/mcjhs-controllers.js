const HttpError = require("../models/http-error");
const MCJHSQuest = require("../models/mcjhs");
const { validationResult } = require("express-validator");

const getAllQuestions = async (req, res, next) => {
  let quest;
  try {
    quest = await MCJHSQuest.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching question failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ quest: quest.map((q) => q.toObject({ getters: true })) });
};

const getQuestionById = async (req, res, next) => {
  const questId = req.params.qid;
  let quest;

  try {
    quest = await MCJHSQuest.findById(questId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a question.",
      500
    );
    return next(error);
  }

  if (!quest) {
    const error = new HttpError(
      "Could not find question for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ quest: quest.toObject({ getters: true }) });
};

const createQuestion = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { index, question, score } = req.query;
  const createdQuestion = new MCJHSQuest({
    index,
    value: index.toString(),
    question,
    score,
    bg: "--light",
    border: "--primary",
    font: "--primary",
  });
  try {
    await createdQuestion.save();
  } catch (err) {
    const error = new HttpError(
      "Create question failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ quest: createdQuestion });
};

const updateQuestion = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { question, score } = req.body;
  const questId = req.params.qid;

  let quest;
  try {
    quest = await MCJHSQuest.findById(questId);
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update question",
      500
    );
    return next(error);
  }

  quest.question = question;
  quest.score = score;

  try {
    await quest.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update question",
      500
    );
    return next(error);
  }

  res.status(200).json({ quest: quest.toObject({ getters: true }) });
};

const answerQuestion = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { value, bg, border, font } = req.body;
  const questId = req.params.qid;

  let quest;
  try {
    quest = await MCJHSQuest.findById(questId);
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update question",
      500
    );
    return next(error);
  }

  quest.value = value;
  quest.bg = bg;
  quest.border = border;
  quest.font = font;

  try {
    await quest.save();
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update question",
      500
    );
    return next(error);
  }

  res.status(200).json({ quest: quest.toObject({ getters: true }) });
};

const resetQuestions = async (req, res, next) => {
  try {
    await MCJHSQuest.updateMany({}, [
      {
        $set: {
          value: {
            $toString: "$index",
          },
          bg: "--light",
          border: "--primary",
          font: "--primary",
        },
      },
    ]);
  } catch (err) {
    const error = new HttpError(
      "Something when wrong, could not update question",
      500
    );
    return next(error);
  }

  let quest;
  try {
    quest = await MCJHSQuest.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching question failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ quest: quest.map((q) => q.toObject({ getters: true })) });
};

exports.getQuestionById = getQuestionById;
exports.createQuestion = createQuestion;
exports.updateQuestion = updateQuestion;
exports.getAllQuestions = getAllQuestions;
exports.answerQuestion = answerQuestion;
exports.resetQuestions = resetQuestions;
