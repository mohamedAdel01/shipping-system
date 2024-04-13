const express = require("express"),
  router = express.Router();

const { isAutherized } = require("../../controllers/auth-controller");
const {
  readShipmentController,
  createShipmentController,
} = require("../../controllers/shipment-controller");

router.get("/all", isAutherized, readShipmentController);
router.post("/create", isAutherized, createShipmentController);

module.exports = router;
