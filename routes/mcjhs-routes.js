const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const mcjhsControllers = require("../controllers/mcjhs-controllers");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);
router.get("/", mcjhsControllers.getAllQuestions);
router.get("/:qid", mcjhsControllers.getQuestionById);
router.post(
  "/",
  [
    check("question").not().isEmpty(),
    check("score").isLength({ min: 2, max: 2 }),
  ],
  mcjhsControllers.createQuestion
);
router.patch(
  "/:qid",
  [
    check("question").not().isEmpty(),
    check("score").isLength({ min: 2, max: 2 }),
  ],
  mcjhsControllers.updateQuestion
);

router.patch("/answer/:qid", mcjhsControllers.answerQuestion);
router.patch("/reset/all", mcjhsControllers.resetQuestions);

module.exports = router;
