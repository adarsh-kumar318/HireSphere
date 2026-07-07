const Application = require("../models/Application");
const Job = require("../models/Job");

// ==========================================
// Apply Job
// ==========================================
exports.applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!jobId || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      freelancer: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
    });

    return res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// My Applications
// ==========================================
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      freelancer: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Applicants of a Job (Client)
// ==========================================
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("freelancer", "name email avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Accept / Reject Application
// ==========================================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};