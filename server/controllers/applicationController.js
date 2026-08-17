const Application = require("../models/Application");
const Job = require("../models/Job");

// ==========================================
// Apply Job - Freelancer
// ==========================================
exports.applyJob = async (req, res) => {
  try {
    const {
      jobId,
      coverLetter,
      bidAmount,
      timeline,
    } = req.body;

    // Validate fields
    if (
      !jobId ||
      !coverLetter ||
      bidAmount === undefined ||
      bidAmount === null ||
      !timeline
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check duplicate application
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

    // Create application
    const application = await Application.create({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
      bidAmount: Number(bidAmount),
      timeline,
    });

    return res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// My Applications - Freelancer
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
    console.error("Get My Applications Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// My Collaborations - Freelancer
// Accepted Applications
// ==========================================
exports.getMyCollaborations = async (req, res) => {
  try {
    const collaborations = await Application.find({
      freelancer: req.user.id,
      status: "accepted",
    })
      .populate("job", "title description budget deadline createdBy")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: collaborations.length,
      collaborations,
    });
  } catch (error) {
    console.error("Get Collaborations Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Applicants of a Job - Client
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

    // Only job owner can see applicants
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
    console.error("Get Job Applications Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Accept / Reject Application - Client
// ==========================================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Find application
    const application = await Application.findById(
      applicationId
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check job owner
    if (
      application.job.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // Update status
    application.status = status;

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update Application Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};