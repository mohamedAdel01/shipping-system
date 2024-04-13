const express = require("express"),
  router = express.Router();

const {
  registerController,
  loginController,
} = require("../../controllers/auth-controller");

// client routes
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
