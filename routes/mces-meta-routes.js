const express = require("express");
const router = express.Router();
const mcesMeta = require("../controllers/mces-meta-controllers");

router.get("/", mcesMeta.getMeta);
router.post("/", mcesMeta.createMeta);
router.patch("/upres", mcesMeta.updateRes);
router.patch("/upmod", mcesMeta.updateMod);
router.patch("/upless", mcesMeta.updateLess);
router.patch("/updiag", mcesMeta.updateDiag);
router.patch("/reset", mcesMeta.resetMeta);

module.exports = router;
