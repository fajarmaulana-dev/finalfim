const HttpError = require("../utils/http-error");
const MCSHSQuest = require("../models/mcshs");
const { validationResult } = require("express-validator");

const getAllQuestions = async (req, res, next) => {
  let quest;
  try {
    quest = await MCSHSQuest.find({});
  } catch (err) {
    const error = new HttpError(
      "Gagal mendapatkan data soal, silakan coba lagi",
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
    quest = await MCSHSQuest.findById(questId);
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }

  if (!quest) {
    const error = new HttpError("Tidak dapat menemukan soal yang diminta", 404);
    return next(error);
  }

  res.json({ quest: quest.toObject({ getters: true }) });
};

const createQuestion = async (req, res, next) => {
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "question") {
    return next(new HttpError("Soal tidak boleh kosong", 422));
  }
  if (errorParam[0] === "score") {
    return next(new HttpError("Skor harus terdiri dari dua digit", 422));
  }
  const { index, question, score } = req.query;
  const createdQuestion = new MCSHSQuest({
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
    const error = new HttpError("Gagal menyimpan soal, silakan coba lagi", 500);
    return next(error);
  }
  res.status(201).json({ quest: createdQuestion });
};

const updateQuestion = async (req, res, next) => {
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "question") {
    return next(new HttpError("Soal tidak boleh kosong", 422));
  }
  if (errorParam[0] === "score") {
    return next(new HttpError("Skor harus terdiri dari dua digit", 422));
  }
  const { question, score } = req.body;
  const questId = req.params.qid;

  let quest;
  try {
    quest = await MCSHSQuest.findById(questId);
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }

  quest.question = question;
  quest.score = score;

  try {
    await quest.save();
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat memperbarui soal, silakan coba lagi",
      500
    );
    return next(error);
  }

  res.status(200).json({ quest: quest.toObject({ getters: true }) });
};

const answerQuestion = async (req, res, next) => {
  const { value, bg, border, font } = req.body;
  const questId = req.params.qid;

  let quest;
  try {
    quest = await MCSHSQuest.findById(questId);
  } catch (err) {
    const error = new HttpError(
      "Jawaban gagal tersimpan, silakan coba lagi",
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
      "Jawaban gagal tersimpan, silakan coba lagi",
      500
    );
    return next(error);
  }

  res.status(200).json({ quest: quest.toObject({ getters: true }) });
};

const resetQuestions = async (req, res, next) => {
  try {
    await MCSHSQuest.updateMany({}, [
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
      "Gagal mereset data jawaban, silakan coba lagi",
      500
    );
    return next(error);
  }

  let quest;
  try {
    quest = await MCSHSQuest.find({});
  } catch (err) {
    const error = new HttpError(
      "Gagal mereset data jawaban, silakan coba lagi",
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
