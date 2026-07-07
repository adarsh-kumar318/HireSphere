const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// Admin Dashboard
exports.adminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalClients = await User.countDocuments({
      role: "client",
    });

    const totalFreelancers = await User.countDocuments({
      role: "freelancer",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalClients,
        totalFreelancers,
        totalJobs,
        totalApplications,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};