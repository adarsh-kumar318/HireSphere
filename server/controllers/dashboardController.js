const Job = require("../models/Job");
const Application = require("../models/Application");

// =====================================
// Freelancer Dashboard
// =====================================
exports.freelancerDashboard = async (req, res) => {
  try {
    const applications = await Application.find({
      freelancer: req.user.id,
    })
      .populate("job", "title company location salary")
      .sort({ createdAt: -1 });

    const totalApplications = applications.length;

    const pending = applications.filter(
      (application) => application.status === "pending"
    ).length;

    const accepted = applications.filter(
      (application) => application.status === "accepted"
    ).length;

    const rejected = applications.filter(
      (application) => application.status === "rejected"
    ).length;

    const recentProjects = applications
      .filter((application) => application.status === "accepted")
      .slice(0, 5)
      .map((application) => ({
        id: application._id,
        title: application.job?.title || "Untitled Project",
        client: application.job?.company || "Unknown Client",
        budget: application.bidAmount,
        status: application.status,
        createdAt: application.createdAt,
      }));

    return res.status(200).json({
      success: true,
      dashboard: {
        totalApplications,
        pending,
        accepted,
        rejected,
        recentProjects,
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