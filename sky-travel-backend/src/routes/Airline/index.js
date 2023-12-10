const express = require("express");
const { AuthAirLine } = require("../../middlewares/Auth");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/flight", AuthAirLine, require("./flight"));
router.use("/route", AuthAirLine, require("./route"));
router.use("/schedule", AuthAirLine, require("./schedule"));

module.exports = router;
