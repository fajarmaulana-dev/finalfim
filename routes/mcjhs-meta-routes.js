const express = require("express");
const router = express.Router();
const mcjhsMeta = require("../controllers/mcjhs-meta-controllers");

router.get("/", mcjhsMeta.getMeta);
router.post("/", mcjhsMeta.createMeta);
router.patch("/update", mcjhsMeta.updateMeta);
router.patch("/reset", mcjhsMeta.resetMeta);

module.exports = router;
