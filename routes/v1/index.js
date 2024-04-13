const express = require("express");
const router = express.Router();

// client routes
router.use("/auth", require("./auth"));
router.use("/address", require("./address"));
router.use("/service", require("./service"));
router.use("/shipment", require("./shipment"));

// admin routes
router.use("/admin/shipment", require("./admin/shipment"));
router.use("/admin/user", require("./admin/user"));

module.exports = router;
