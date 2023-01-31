const express = require("express");
const router = express.Router();
const mcshsMeta = require("../controllers/mcshs-meta-controllers");
const deserializer = require("../middlewares/deserializer");
const requireUser = require("../middlewares/require-user");

router.get("/", mcshsMeta.getMeta);

router.use(deserializer, requireUser);
router.post("/", mcshsMeta.createMeta);
router.patch("/update", mcshsMeta.updateMeta);
router.patch("/reset", mcshsMeta.resetMeta);

module.exports = router;
