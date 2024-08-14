const express = require("express");
const router = express.Router();
const validateFrom = require("../controllers/formValidation");

router.post("/login", (req, res) => {
  validateFrom(req, res);
});

router.post("/register", (req, res) => {
  validateFrom(req, res);
});

module.exports = router;
