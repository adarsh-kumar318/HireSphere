const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createCompany,
  getMyCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Create Company - Client only
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("client"),
  createCompany
);

// Get logged-in client's company
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("client"),
  getMyCompany
);

// Get company by ID - Public
router.get("/:id", getCompanyById);

// Update Company - Client only
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("client"),
  updateCompany
);

// Delete Company - Client only
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("client"),
  deleteCompany
);

module.exports = router;