const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");

const mapJobToGig = (job) => ({
  _id: job._id,
  id: job._id,
  title: job.title,
  client: job.company || "Client",
  freelancer: job.company,
  location: job.location,
  budget: job.salary,
  startingPrice: job.salary,
  description: job.description,
  category: "Services",
  status: "Open",
  deliveryTime: "Flexible",
  rating: null,
  reviewCount: 0,
  seller: { name: job.company || "Client" },
});

const mapUserToFreelancer = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  title: "Freelancer",
  location: "",
  avatar: user.avatar || "",
  skills: [],
  rating: null,
  hourlyRate: null,
  verified: user.isVerified,
});

exports.getMarketplaceGigs = async (req, res) => {
  try {
    const { limit = 6, keyword, location, sort } = req.query;
    const query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      query.location = location;
    }

    const sortOption = sort === "popular" ? { createdAt: -1 } : { createdAt: -1 };

    const jobs = await Job.find(query)
      .sort(sortOption)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      gigs: jobs.map(mapJobToGig),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMarketplaceFreelancers = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const freelancers = await User.find({ role: "freelancer" })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      freelancers: freelancers.map(mapUserToFreelancer),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPlatformStats = async (req, res) => {
  try {
    const [totalUsers, totalFreelancers, totalJobs, totalApplications] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "freelancer" }),
      Job.countDocuments(),
      Application.countDocuments(),
    ]);

    const acceptedApplications = await Application.countDocuments({ status: "accepted" });
    const jobSuccessRate =
      totalApplications > 0
        ? Math.round((acceptedApplications / totalApplications) * 100)
        : null;

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalFreelancers,
        totalJobs,
        totalApplications,
        jobSuccessRate,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTestimonials = async (_req, res) => {
  return res.status(200).json({
    success: true,
    testimonials: [],
  });
};

exports.getTrendingSkills = async (_req, res) => {
  try {
    const jobs = await Job.find().select("title description").limit(20);
    const words = jobs
      .flatMap((job) => `${job.title} ${job.description}`.split(/\s+/))
      .filter((word) => word.length > 3)
      .slice(0, 8);

    return res.status(200).json({
      success: true,
      skills: [...new Set(words)],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
