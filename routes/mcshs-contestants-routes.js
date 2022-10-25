const express = require("express");
const router = express.Router();
const mcshscControllers = require("../controllers/mcshs-contestants-controllers");

router.get("/", mcshscControllers.getAllContestants);
router.get("/:qid", mcshscControllers.getContestantById);
router.post("/", mcshscControllers.createContestant);
router.patch("/update/score", mcshscControllers.updateContestant);
router.patch("/reset/all", mcshscControllers.resetContestants);

module.exports = router;
