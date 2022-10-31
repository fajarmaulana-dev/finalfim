const express = require("express");
const router = express.Router();
const mcjhsMeta = require("../controllers/mcjhs-meta-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/", mcjhsMeta.getMeta);

router.use(checkAuth);
router.post("/", mcjhsMeta.createMeta);
router.patch("/update", mcjhsMeta.updateMeta);
router.patch("/reset", mcjhsMeta.resetMeta);

module.exports = router;
