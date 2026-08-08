const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
//admin//
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);
// ⭐ Client Route
router.get(
  "/client",
  authMiddleware,
  roleMiddleware("client"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Client",
    });
  }
);

// ⭐ Freelancer Route
router.get(
  "/freelancer",
  authMiddleware,
  roleMiddleware("freelancer"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Freelancer",
    });
  }
);

module.exports = router;