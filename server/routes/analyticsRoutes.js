const express = require("express");

const {
  getAnalytics,
} = require("../controllers/analyticsController");

const authmiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authmiddleware, getAnalytics);

module.exports = router;