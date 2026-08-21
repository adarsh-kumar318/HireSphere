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
  getMyProjects,
  submitProject,
  approveSubmission,
  requestSubmissionChanges,
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
// Freelancer - Submit Project
// ==========================================
router.post(
  "/:applicationId/submit",
  authMiddleware,
  roleMiddleware("freelancer"),
  submitProject
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
// Client - My Projects
// ==========================================
router.get(
  "/projects",
  authMiddleware,
  roleMiddleware("client"),
  getMyProjects
);

// ==========================================
// Client - Approve Submission
// ==========================================
router.patch(
  "/:applicationId/submission/approve",
  authMiddleware,
  roleMiddleware("client"),
  approveSubmission
);

// ==========================================
// Client - Request Submission Changes
// ==========================================
router.patch(
  "/:applicationId/submission/request-changes",
  authMiddleware,
  roleMiddleware("client"),
  requestSubmissionChanges
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