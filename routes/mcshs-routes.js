const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const mcshsControllers = require("../controllers/mcshs-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.use(deserializer, requireUser);
router.get("/", mcshsControllers.getAllQuestions);
router.get("/:qid", mcshsControllers.getQuestionById);
router.post(
  "/",
  [
    check("question")
      .not()
      .isEmpty(),
    check("score").isLength({ min: 2, max: 2 }),
  ],
  mcshsControllers.createQuestion
);
router.patch(
  "/:qid",
  [
    check("question")
      .not()
      .isEmpty(),
    check("score").isLength({ min: 2, max: 2 }),
  ],
  mcshsControllers.updateQuestion
);

router.patch("/answer/:qid", mcshsControllers.answerQuestion);
router.patch("/reset/all", mcshsControllers.resetQuestions);

module.exports = router;
