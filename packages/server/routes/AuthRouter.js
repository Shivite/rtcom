const express = require("express");
const router = express.Router();
const validateFrom = require("../controllers/formValidation");
const {
  handleGetLogin,
  handlePostLogin,
  handlePostRegistration,
} = require("../controllers/AuthController");
const { limitApiRequest } = require("../controllers/ApiLimits");

router
  .route("/login")
  .get(handleGetLogin)
  .post(limitApiRequest(60, 5), validateFrom, handlePostLogin);
router
  .route("/register")
  .post(limitApiRequest(60, 3), validateFrom, handlePostRegistration);

module.exports = router;
