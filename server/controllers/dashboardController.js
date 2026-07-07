const Job = require("../models/Job");
const Application = require("../models/Application");

// =====================================
// Freelancer Dashboard
// =====================================
exports.freelancerDashboard = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments({
      freelancer: req.user.id,
    });

    const pending = await Application.countDocuments({
      freelancer: req.user.id,
      status: "pending",
    });

    const accepted = await Application.countDocuments({
      freelancer: req.user.id,
      status: "accepted",
    });

    const rejected = await Application.countDocuments({
      freelancer: req.user.id,
      status: "rejected",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalApplications,
        pending,
        accepted,
        rejected,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Client Dashboard
// =====================================
exports.clientDashboard = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({
      createdBy: req.user.id,
    });

    const jobs = await Job.find({
      createdBy: req.user.id,
    });

    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    return res.status(200).json({
      success: true,
      dashboard: {
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

// =====================================
// Admin Dashboard
// =====================================
exports.adminDashboard = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    return res.status(200).json({
      success: true,
      dashboard: {
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