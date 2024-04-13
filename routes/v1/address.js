const express = require("express"),
  router = express.Router();

const { isAutherized } = require("../../controllers/auth-controller");

const {
  readAddressController,
  createAddressController,
  deleteAddressController,
} = require("../../controllers/address-controller");

// client routes
router.get("/all", isAutherized, readAddressController);
router.post("/create", isAutherized, createAddressController);
router.delete("/delete/:id", isAutherized, deleteAddressController);

module.exports = router;
