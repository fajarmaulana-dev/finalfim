const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const mcesControllers = require("../controllers/mces-controllers");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);
router.get("/", mcesControllers.getAllQuestions);
router.get("/:qid", mcesControllers.getQuestionById);
router.post(
  "/",
  [
    check("question").not().isEmpty(),
    check("score").isLength({ min: 2, max: 2 }),
  ],
  mcesControllers.createQuestion
);
router.patch(
  "/:qid",
  [
    check("question").not().isEmpty(),
    check("score").isLength({ min: 2, max: 2 }),
  ],
  mcesControllers.updateQuestion
);

router.patch("/answer/:qid", mcesControllers.answerQuestion);
router.patch("/reset/all", mcesControllers.resetQuestions);

module.exports = router;
