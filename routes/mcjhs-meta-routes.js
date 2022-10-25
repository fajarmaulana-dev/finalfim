const express = require("express");
const router = express.Router();
const mcjhsMeta = require("../controllers/mcjhs-meta-controllers");

router.get("/", mcjhsMeta.getMeta);
router.post("/", mcjhsMeta.createMeta);
router.patch("/upres", mcjhsMeta.updateRes);
router.patch("/upmod", mcjhsMeta.updateMod);
router.patch("/upless", mcjhsMeta.updateLess);
router.patch("/updiag", mcjhsMeta.updateDiag);
router.patch("/reset", mcjhsMeta.resetMeta);

module.exports = router;
