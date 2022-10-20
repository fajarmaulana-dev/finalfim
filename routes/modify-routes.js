const express = require("express");
const router = express.Router();

DUMMY_QUESTS = [
  {
    id: "q1",
    index: 1,
    value: "1",
    question: "Ada apa dengan cinta",
    score: 40,
    bg: "--light",
    border: "--primary",
    font: "--primary",
  },
];

router.get("/", (req, res, next) => {
  console.log("GET Request");
  res.json({ message: "It works!" });
});

module.exports = router;
