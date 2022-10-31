const express = require("express");
const router = express.Router();
const mcshsMeta = require("../controllers/mcshs-meta-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/", mcshsMeta.getMeta);

router.use(checkAuth);
router.post("/", mcshsMeta.createMeta);
router.patch("/update", mcshsMeta.updateMeta);
router.patch("/reset", mcshsMeta.resetMeta);

module.exports = router;
