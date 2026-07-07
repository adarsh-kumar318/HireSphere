const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  freelancerDashboard,
  clientDashboard,
  adminDashboard,
} = require("../controllers/dashboardController");

// Freelancer Dashboard
router.get(
  "/freelancer",
  authMiddleware,
  roleMiddleware("freelancer"),
  freelancerDashboard
);

// Client Dashboard
router.get(
  "/client",
  authMiddleware,
  roleMiddleware("client"),
  clientDashboard
);

// Admin Dashboard
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

module.exports = router;