const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Apply Job
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("freelancer"),
  applyJob
);

// My Applications
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("freelancer"),
  getMyApplications
);

// View Applicants (Client)
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("client"),
  getJobApplications
);
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("freelancer"),
  applyJob
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("freelancer"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("client"),
  getJobApplications
);

// ⭐ YAHAN ADD KARO
router.put(
  "/:applicationId/status",
  authMiddleware,
  roleMiddleware("client"),
  updateApplicationStatus
);

module.exports = router;

module.exports = router;