const express = require("express");
const router = express.Router();
const mcjhscControllers = require("../controllers/mcjhs-contestants-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/", mcjhscControllers.getAllContestants);
router.get("/:qid", mcjhscControllers.getContestantById);

router.use(checkAuth);
router.post("/", mcjhscControllers.createContestant);
router.patch("/update/score", mcjhscControllers.updateContestant);
router.patch("/reset/all", mcjhscControllers.resetContestants);

module.exports = router;
