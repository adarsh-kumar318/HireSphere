const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  adminStats,
} = require("../controllers/adminController");

router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  adminStats
);

module.exports = router;