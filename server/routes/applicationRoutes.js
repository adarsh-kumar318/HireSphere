const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  applyJob,
  getMyApplications,
  getMyCollaborations,
  getJobApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// ==========================================
// Freelancer - Apply Job
// ==========================================
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("freelancer"),
  applyJob
);

// ==========================================
// Freelancer - My Applications
// ==========================================
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("freelancer"),
  getMyApplications
);

// ==========================================
// Freelancer - My Collaborations
// ==========================================
router.get(
  "/collaborations",
  authMiddleware,
  roleMiddleware("freelancer"),
  getMyCollaborations
);

// ==========================================
// Client - View Job Applications
// ==========================================
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("client"),
  getJobApplications
);

// ==========================================
// Client - Accept / Reject Application
// ==========================================
router.put(
  "/:applicationId/status",
  authMiddleware,
  roleMiddleware("client"),
  updateApplicationStatus
);

module.exports = router;