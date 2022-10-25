const express = require("express");
const router = express.Router();
const mcshsMeta = require("../controllers/mcshs-meta-controllers");

router.get("/", mcshsMeta.getMeta);
router.post("/", mcshsMeta.createMeta);
router.patch("/upres", mcshsMeta.updateRes);
router.patch("/upmod", mcshsMeta.updateMod);
router.patch("/upless", mcshsMeta.updateLess);
router.patch("/updiag", mcshsMeta.updateDiag);
router.patch("/reset", mcshsMeta.resetMeta);

module.exports = router;
