const express = require("express");
const router = express.Router();
const mcshscControllers = require("../controllers/mcshs-contestants-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/", mcshscControllers.getAllContestants);
router.get("/:qid", mcshscControllers.getContestantById);

router.use(checkAuth);
router.post("/", mcshscControllers.createContestant);
router.patch("/update/score", mcshscControllers.updateContestant);
router.patch("/reset/all", mcshscControllers.resetContestants);

module.exports = router;
