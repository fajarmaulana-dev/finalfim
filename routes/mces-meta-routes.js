const express = require("express");
const router = express.Router();
const mcesMeta = require("../controllers/mces-meta-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/", mcesMeta.getMeta);

router.use(checkAuth);
router.post("/", mcesMeta.createMeta);
router.patch("/update", mcesMeta.updateMeta);
router.patch("/reset", mcesMeta.resetMeta);

module.exports = router;
