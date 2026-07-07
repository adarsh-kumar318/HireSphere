const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  uploadAvatar,
  uploadResume,
} = require("../controllers/uploadController");

// Upload Avatar
router.put(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

// Upload Resume
router.put(
  "/resume",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

module.exports = router;