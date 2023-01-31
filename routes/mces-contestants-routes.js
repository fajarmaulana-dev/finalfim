const express = require("express");
const router = express.Router();
const mcescControllers = require("../controllers/mces-contestants-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.get("/", mcescControllers.getAllContestants);
router.get("/:qid", mcescControllers.getContestantById);

router.use(deserializer, requireUser);
router.post("/", mcescControllers.createContestant);
router.patch("/update/score", mcescControllers.updateContestant);
router.patch("/reset/all", mcescControllers.resetContestants);

module.exports = router;
