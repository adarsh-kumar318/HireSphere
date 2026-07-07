const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Create Job (Only client)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("client"),
  createJob
);
router.get("/", getAllJobs);
//get sungle job//
router.get("/:id", getSingleJob);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("client"),
  updateJob
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("client"),
  deleteJob
);
module.exports = router;