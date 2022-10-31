const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const usersControllers = require("../controllers/users-controller");
const checkAuth = require("../middleware/check-auth");

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
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
    check("email").isEmail(),
    check("password").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    ),
  ],
  usersControllers.login
);
router.post("/refresh", usersControllers.refresh);
router.post("/sendmail", usersControllers.sendLink);
router.patch("/reset/:uid/:token", usersControllers.resetPass);
router.use(checkAuth);
router.get("/", usersControllers.getUsers);
router.patch(
  "/update/:uid",
  [
    check("name").not().isEmpty(),
    check("password").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    ),
  ],
  usersControllers.changePass
);

module.exports = router;
