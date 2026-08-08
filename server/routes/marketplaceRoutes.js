const express = require("express");
const router = express.Router();

const {
  getMarketplaceGigs,
  getMarketplaceFreelancers,
  getPlatformStats,
  getTestimonials,
  getTrendingSkills,
} = require("../controllers/marketplaceController");

router.get("/gigs", getMarketplaceGigs);
router.get("/freelancers", getMarketplaceFreelancers);
router.get("/stats", getPlatformStats);
router.get("/testimonials", getTestimonials);
router.get("/trending-skills", getTrendingSkills);

module.exports = router;
