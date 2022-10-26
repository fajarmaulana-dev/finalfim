const express = require("express");
const router = express.Router();
const mcshsMeta = require("../controllers/mcshs-meta-controllers");

router.get("/", mcshsMeta.getMeta);
router.post("/", mcshsMeta.createMeta);
router.patch("/update", mcshsMeta.updateMeta);
router.patch("/reset", mcshsMeta.resetMeta);

module.exports = router;
