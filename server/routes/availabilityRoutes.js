const express = require("express");

const {
  getAvailability,
  saveAvailability,
} = require("../controllers/availabilityController");

const authmiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authmiddleware, getAvailability);
router.post("/", authmiddleware, saveAvailability);

module.exports = router;