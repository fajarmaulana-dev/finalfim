const express = require("express");
const router = express.Router();
const mcesMeta = require("../controllers/mces-meta-controllers");

router.get("/", mcesMeta.getMeta);
router.post("/", mcesMeta.createMeta);
router.patch("/update", mcesMeta.updateMeta);
router.patch("/reset", mcesMeta.resetMeta);

module.exports = router;
