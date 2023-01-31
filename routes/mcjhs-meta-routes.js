const express = require("express");
const router = express.Router();
const mcjhsMeta = require("../controllers/mcjhs-meta-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.get("/", mcjhsMeta.getMeta);

router.use(deserializer, requireUser);
router.post("/", mcjhsMeta.createMeta);
router.patch("/update", mcjhsMeta.updateMeta);
router.patch("/reset", mcjhsMeta.resetMeta);

module.exports = router;
