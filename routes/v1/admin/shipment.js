const express = require("express"),
  router = express.Router();

const {
  isAutherized,
  isAdmin,
} = require("../../../controllers/auth-controller");
const {
  readShipmentController,
  deleteShipmentController,
} = require("../../../controllers/shipment-controller");

router.get("/all", isAutherized, isAdmin, readShipmentController);
router.delete("/delete/:id", isAutherized, isAdmin, deleteShipmentController);

module.exports = router;
