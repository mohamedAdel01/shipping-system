const express = require("express"),
  router = express.Router();

const {
  readServiceController,
} = require("../../controllers/service-controller");

// client routes
router.get("/all", readServiceController);

module.exports = router;
