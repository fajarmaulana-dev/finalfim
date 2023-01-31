const express = require("express");
const router = express.Router();
const mcjhscControllers = require("../controllers/mcjhs-contestants-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.get("/", mcjhscControllers.getAllContestants);
router.get("/:qid", mcjhscControllers.getContestantById);

router.use(deserializer, requireUser);
router.post("/", mcjhscControllers.createContestant);
router.patch("/update/score", mcjhscControllers.updateContestant);
router.patch("/reset/all", mcjhscControllers.resetContestants);

module.exports = router;
