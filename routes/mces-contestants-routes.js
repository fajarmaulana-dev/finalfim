const express = require("express");
const router = express.Router();
const mcescControllers = require("../controllers/mces-contestants-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/", mcescControllers.getAllContestants);
router.get("/:qid", mcescControllers.getContestantById);

router.use(checkAuth);
router.post("/", mcescControllers.createContestant);
router.patch("/update/score", mcescControllers.updateContestant);
router.patch("/reset/all", mcescControllers.resetContestants);

module.exports = router;
