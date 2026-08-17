const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Get logged-in user's notifications
router.get(
  "/",
  authMiddleware,
  getMyNotifications
);

// Mark one as read
router.put(
  "/:notificationId/read",
  authMiddleware,
  markAsRead
);

// Mark all as read
router.put(
  "/read-all",
  authMiddleware,
  markAllAsRead
);

// Delete notification
router.delete(
  "/:notificationId",
  authMiddleware,
  deleteNotification
);

module.exports = router;