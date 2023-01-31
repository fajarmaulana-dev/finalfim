const express = require("express");
const router = express.Router();
const mcesMeta = require("../controllers/mces-meta-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.get("/", mcesMeta.getMeta);

router.use(deserializer, requireUser);
router.post("/", mcesMeta.createMeta);
router.patch("/update", mcesMeta.updateMeta);
router.patch("/reset", mcesMeta.resetMeta);

module.exports = router;
