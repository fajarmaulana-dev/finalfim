const HttpError = require("../utils/http-error");
const { EQuest, JQuest, SQuest } = require("../models/question");
const { EPart, JPart, SPart } = require("../models/contestant");
const { EMeta, JMeta, SMeta } = require("../models/meta");
const { validationResult } = require("express-validator");
const analyze = require("../utils/analyzer");

const bad = "Kesalahan server/koneksi, silakan coba lagi.";

const createData = async (req, res, next) => {
  const { is } = req.query;
  const sum = is === "mces" ? 25 : 16;
  let quest, part, meta;
  try {
    if (is == "mces") {
      quest = await EQuest.findOne();
      part = await EPart.findOne();
      meta = await EMeta.findOne();
    }
    if (is == "mcjhs") {
      quest = await JQuest.findOne();
      part = await JPart.findOne();
      meta = await JMeta.findOne();
    }
    if (is == "mcshs") {
      quest = await SQuest.findOne();
      part = await SPart.findOne();
      meta = await SMeta.findOne();
    }
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  if (quest !== null && part !== null && meta !== null)
    return next(
      new HttpError(
        `Inisiasi data telah dilakukan pada koleksi ${is}. Silakan reset koleksi terlebih dahulu untuk membuat inisiasi baru.`,
        409
      )
    );

  const questions = [...Array(sum)].map((_, i) => {
    return {
      index: i + 1,
      answer: (i + 1).toString(),
      color: "border-sky-600 text-sky-600 bg-white",
      point: 30,
      question: `<p>Soal ${is} nomor ${i + 1} belum diedit.</p>`,
      disMin: [...Array(6)].map((_, i) => false),
      disTemp: [...Array(6)].map((_, i) => false),
    };
  });

  const color = ["rose", "sky", "amber", "emerald", "fuchsia", "orange"];
  const contestants = [...Array(6)].map((_, i) => {
    return {
      name: String.fromCharCode(i + 65),
      color: color[i],
      point: 100,
    };
  });

  const metas = {
    answerer: [...Array(sum)].map((_, i) => "JC"),
    watcher: [...Array(4)].map((_, i) =>
      Object.fromEntries([...Array(Math.sqrt(sum))].map((_, i) => [i.toString(), ""]))
    ),
    reducer: [[], []],
  };

  const error = [];

  try {
    if (is == "mces") {
      try {
        if (meta === null) await EMeta.create(metas);
      } catch (err) {
        error.push("meta");
      }
      try {
        if (quest === null) await EQuest.create(questions);
      } catch (err) {
        error.push("question");
      }
      try {
        if (part === null) await EPart.create(contestants);
      } catch (err) {
        error.push("contestant");
      }
    }
    if (is == "mcjhs") {
      try {
        if (meta === null) await JMeta.create(metas);
      } catch (err) {
        error.push("meta");
      }
      try {
        if (quest === null) await JQuest.create(questions);
      } catch (err) {
        error.push("question");
      }
      try {
        if (part === null) await JPart.create(contestants);
      } catch (err) {
        error.push("contestant");
      }
    }
    if (is == "mcshs") {
      try {
        if (meta === null) await SMeta.create(metas);
      } catch (err) {
        error.push("meta");
      }
      try {
        if (quest === null) await SQuest.create(questions);
      } catch (err) {
        error.push("question");
      }
      try {
        if (part === null) await SPart.create(contestants);
      } catch (err) {
        error.push("contestant");
      }
    }
  } catch (err) {
    return next(new HttpError(`${bad} Error on ${error.join(", ")}`, 500));
  }

  res.status(200).json({
    message: "Inisiasi data berhasil dilakukan.",
  });
};

const remove = async (req, res, next) => {
  const { is } = req.query;

  try {
    if (is == "mces") {
      await EMeta.deleteMany({});
      await EQuest.deleteMany({});
      await EPart.deleteMany({});
    }
    if (is == "mcjhs") {
      await JMeta.deleteMany({});
      await JQuest.deleteMany({});
      await JPart.deleteMany({});
    }
    if (is == "mcshs") {
      await SMeta.deleteMany({});
      await SQuest.deleteMany({});
      await SPart.deleteMany({});
    }
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({
    message: "Penghapusan data inisiasi berhasil dilakukan.",
  });
};

const getDatas = async (req, res, next) => {
  const { is } = req.query;
  let questions, contestants;
  try {
    if (is == "mces") {
      questions = await EQuest.aggregate([
        { $sort: { index: 1 } },
        { $project: { answer: "$answer", color: "$color" } },
      ]);
      contestants = await EPart.aggregate([
        { $sort: { name: 1 } },
        { $project: { name: "$name", point: "$point", color: "$color" } },
      ]);
    }
    if (is == "mcjhs") {
      questions = await JQuest.aggregate([
        { $sort: { index: 1 } },
        { $project: { answer: "$answer", color: "$color" } },
      ]);
      contestants = await JPart.aggregate([
        { $sort: { name: 1 } },
        { $project: { name: "$name", point: "$point", color: "$color" } },
      ]);
    }
    if (is == "mcshs") {
      questions = await SQuest.aggregate([
        { $sort: { index: 1 } },
        { $project: { answer: "$answer", color: "$color" } },
      ]);
      contestants = await SPart.aggregate([
        { $sort: { name: 1 } },
        { $project: { name: "$name", point: "$point", color: "$color" } },
      ]);
    }
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  let contestant;
  try {
    contestant = contestants.map((c) => {
      return {
        name: c.name,
        point: c.point,
        color: `border-${c.color}-600 text-${c.color}-600 bg-${c.color}-100`,
      };
    });
  } catch (error) {
    return next(new HttpError("Gagal melakukan operasi pemetaan. Silakan reload halaman.", 409));
  }

  const changed =
    questions.map((q) => q.answer).some((i) => isNaN(i)) ||
    !contestant.map((c) => c.point).every((i) => i == 100);

  const data = {
    quest: questions,
    contestant,
    changed,
  };

  res.status(200).json({ data });
};

const getQuest = async (req, res, next) => {
  const index = req.params.idx;
  const { is } = req.query;

  let quest;
  try {
    if (is == "mces") quest = await EQuest.findOne({ index });
    if (is == "mcjhs") quest = await JQuest.findOne({ index });
    if (is == "mcshs") quest = await SQuest.findOne({ index });
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({ quest });
};

const getQuests = async (req, res, next) => {
  const { is, from, number } = req.query;

  let data;
  try {
    if (is == "mces")
      data = await EQuest.aggregate([
        { $sort: { index: 1 } },
        { $skip: Number(from) },
        { $limit: Number(number) },
        { $project: { question: "$question", point: "$point" } },
      ]);
    if (is == "mcjhs")
      data = await JQuest.aggregate([
        { $sort: { index: 1 } },
        { $skip: Number(from) },
        { $limit: Number(number) },
        { $project: { question: "$question", point: "$point" } },
      ]);
    if (is == "mcshs")
      data = await SQuest.aggregate([
        { $sort: { index: 1 } },
        { $skip: Number(from) },
        { $limit: Number(number) },
        { $project: { question: "$question", point: "$point" } },
      ]);
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({ data });
};

const setPoint = async (req, res, next) => {
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "point") {
    return next(new HttpError("Nilai poin harus berupa bilangan bulat", 422));
  }

  const { is, name, point } = req.body;

  try {
    if (is == "mces") await EPart.updateOne({ name }, { point });
    if (is == "mcjhs") await JPart.updateOne({ name }, { point });
    if (is == "mcshs") await SPart.updateOne({ name }, { point });
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({ message: `Berhasil memperbarui poin peserta ${name}.` });
};

const setAnswer = async (req, res, next) => {
  let { is, index, answer, color, points, bonus, disMin } = req.body;
  const name = ["A", "B", "C", "D", "E", "F"];
  const wrong = Object.fromEntries([...Array(name.length)].map((_, i) => [name[i], disMin[i]]));

  let data;
  try {
    if (is == "mces") data = await EMeta.findOne();
    if (is == "mcjhs") data = await JMeta.findOne();
    if (is == "mcshs") data = await SMeta.findOne();
  } catch (error) {
    return next(new HttpError(bad, 500));
  }

  const initAnswer = data.answerer;
  const answerer = initAnswer.map((i, idx) =>
    i !== "JC" && idx !== index - 1 ? i : idx === index - 1 ? answer : "JC"
  );

  let decision;
  if (JSON.stringify(initAnswer) !== JSON.stringify(answerer)) {
    const { dec, newData } = analyze(is, index, data, answerer);
    decision = dec;
    if (dec !== null) {
      if (dec.val < 0) points[name.indexOf(dec.before)] -= bonus;
      else if (dec.val > 0) points[name.indexOf(dec.after)] += bonus;
      else {
        points[name.indexOf(dec.before)] -= bonus;
        points[name.indexOf(dec.after)] += bonus;
      }
    }

    try {
      if (is == "mces") {
        await EMeta.updateMany({}, [
          {
            $set: {
              answerer,
              watcher: newData.watcher,
              reducer: newData.reducer,
            },
          },
        ]);
      }
      if (is == "mcjhs") {
        await JMeta.updateMany({}, [
          {
            $set: {
              answerer,
              watcher: newData.watcher,
              reducer: newData.reducer,
            },
          },
        ]);
      }
      if (is == "mcshs") {
        await SMeta.updateMany({}, [
          {
            $set: {
              answerer,
              watcher: newData.watcher,
              reducer: newData.reducer,
            },
          },
        ]);
      }
    } catch (err) {
      return next(new HttpError(`${bad} Responden: ${answerer}, Wrong: ${wrong}`, 500));
    }
  }

  const error = [];
  const pointAfter = Object.fromEntries(
    [...Array(name.length)].map((_, i) => [name[i], points[i]])
  );
  try {
    if (is == "mces") {
      try {
        await EQuest.updateOne({ index }, { answer, color, disMin, disTemp: disMin });
      } catch (err) {
        error.push("quest");
      }
      try {
        await EPart.bulkWrite(
          name.map((i, idx) => {
            return {
              updateOne: {
                filter: { name: i },
                update: { point: points[idx] },
              },
            };
          })
        );
      } catch (err) {
        error.push("part");
      }
    }
    if (is == "mcjhs") {
      try {
        await JQuest.updateOne({ index }, { answer, color, disMin, disTemp: disMin });
      } catch (err) {
        error.push("quest");
      }
      try {
        await JPart.bulkWrite(
          name.map((i, idx) => {
            return {
              updateOne: {
                filter: { name: i },
                update: { point: points[idx] },
              },
            };
          })
        );
      } catch (err) {
        error.push("part");
      }
    }
    if (is == "mcshs") {
      try {
        await SQuest.updateOne({ index }, { answer, color, disMin, disTemp: disMin });
      } catch (err) {
        error.push("quest");
      }
      try {
        await SPart.bulkWrite(
          name.map((i, idx) => {
            return {
              updateOne: {
                filter: { name: i },
                update: { point: points[idx] },
              },
            };
          })
        );
      } catch (err) {
        error.push("part");
      }
    }
  } catch (err) {
    return next(
      new HttpError(
        `${bad} ${
          error[0] == "part" ? `Point: ${pointAfter}` : `Responden: ${answerer}, Wrong: ${wrong}`
        }`,
        500
      )
    );
  }

  if (JSON.stringify(initAnswer) !== JSON.stringify(answerer)) {
    res.status(200).json({ message: "Berhasil memperbarui data.", decision });
  } else {
    res.status(200).json({ message: "Berhasil memperbarui data.", decision: null });
  }
};

const resetData = async (req, res, next) => {
  const { is } = req.query;
  const sum = is === "mces" ? 25 : 16;
  const color = "border-sky-600 text-sky-600 bg-white";
  const disMin = [...Array(6)].map((_, i) => false);
  const answerer = [...Array(sum)].map((_, i) => "JC");
  const watcher = [...Array(4)].map((_, i) =>
    Object.fromEntries([...Array(Math.sqrt(sum))].map((_, i) => [i.toString(), ""]))
  );
  const reducer = [[], []];
  try {
    if (is == "mces") {
      await EMeta.updateMany({}, [{ $set: { answerer, watcher, reducer } }]);
      await EQuest.updateMany({}, [
        {
          $set: {
            answer: { $toString: "$index" },
            color,
            disMin,
            disTemp: disMin,
          },
        },
      ]);
      await EPart.updateMany({}, [{ $set: { point: 100 } }]);
    }
    if (is == "mcjhs") {
      await JMeta.updateMany({}, [{ $set: { answerer, watcher, reducer } }]);
      await JQuest.updateMany({}, [
        {
          $set: {
            answer: { $toString: "$index" },
            color,
            disMin,
            disTemp: disMin,
          },
        },
      ]);
      await JPart.updateMany({}, [{ $set: { point: 100 } }]);
    }
    if (is == "mcshs") {
      await SMeta.updateMany({}, [{ $set: { answerer, watcher, reducer } }]);
      await SQuest.updateMany({}, [
        {
          $set: {
            answer: { $toString: "$index" },
            color,
            disMin,
            disTemp: disMin,
          },
        },
      ]);
      await SPart.updateMany({}, [{ $set: { point: 100 } }]);
    }
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({ message: "Berhasil mereset data." });
};

const update = async (req, res, next) => {
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "question") {
    return next(new HttpError("Soal tidak boleh kosong.", 422));
  }
  if (errorParam[0] === "point") {
    return next(new HttpError("Nilai poin harus berupa bilangan bulat", 422));
  }

  const { is, index, point, question } = req.body;

  try {
    if (is == "mces") await EQuest.updateOne({ index }, { point, question });
    if (is == "mcjhs") await JQuest.updateOne({ index }, { point, question });
    if (is == "mcshs") await SQuest.updateOne({ index }, { point, question });
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({ message: `Berhasil memperbarui soal nomor ${index}.` });
};

const resetQuest = async (req, res, next) => {
  const index = req.params.idx;
  const { is } = req.query;

  try {
    if (is == "mces")
      await EQuest.updateOne(
        { index },
        {
          point: 30,
          question: `<p>Soal ${is} nomor ${index} belum diedit.</p>`,
        }
      );
    if (is == "mcjhs")
      await JQuest.updateOne(
        { index },
        {
          point: 30,
          question: `<p>Soal ${is} nomor ${index} belum diedit.</p>`,
        }
      );
    if (is == "mcshs")
      await SQuest.updateOne(
        { index },
        {
          point: 30,
          question: `<p>Soal ${is} nomor ${index} belum diedit.</p>`,
        }
      );
  } catch (err) {
    return next(new HttpError(bad, 500));
  }

  res.status(200).json({ message: "Berhasil memperbarui poin peserta." });
};

exports.createData = createData;
exports.remove = remove;
exports.getDatas = getDatas;
exports.getQuest = getQuest;
exports.getQuests = getQuests;
exports.setPoint = setPoint;
exports.setAnswer = setAnswer;
exports.resetData = resetData;
exports.update = update;
exports.resetQuest = resetQuest;
