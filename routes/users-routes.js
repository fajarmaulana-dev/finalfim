const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const usersControllers = require("../controllers/users-controller");

router.get("/", usersControllers.getUsers);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    ),
  ],
  usersControllers.signup
);
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    ),
  ],
  usersControllers.login
);

module.exports = router;
