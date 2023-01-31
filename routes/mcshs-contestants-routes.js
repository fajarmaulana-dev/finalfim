const express = require("express");
const router = express.Router();
const mcshscControllers = require("../controllers/mcshs-contestants-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.get("/", mcshscControllers.getAllContestants);
router.get("/:qid", mcshscControllers.getContestantById);

router.use(deserializer, requireUser);
router.post("/", mcshscControllers.createContestant);
router.patch("/update/score", mcshscControllers.updateContestant);
router.patch("/reset/all", mcshscControllers.resetContestants);

module.exports = router;
