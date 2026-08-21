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
// ==========================================
exports.getMyCollaborations = async (req, res) => {
  try {
    const applications = await Application.find({
      freelancer: req.user.id,
      status: {
        $in: [
          "accepted",
          "in_progress",
          "pending_review",
          "changes_requested",
          "completed",
        ],
      },
    })
      .populate(
        "job",
        "title description budget deadline createdBy"
      )
      .sort({ updatedAt: -1 });

    const active = applications.filter((application) =>
      ["accepted", "in_progress", "changes_requested"].includes(
        application.status
      )
    );

    const pending = applications.filter(
      (application) =>
        application.status === "pending_review"
    );

    const completed = applications.filter(
      (application) =>
        application.status === "completed"
    );

    return res.status(200).json({
      success: true,
      count: applications.length,
      collaborations: {
        active,
        pending,
        completed,
      },
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

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findById(
      applicationId
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.job.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    if (status === "accepted") {
      application.status = "in_progress";
    } else {
      application.status = "rejected";
    }

    await application.save();

    return res.status(200).json({
      success: true,
      message:
        status === "accepted"
          ? "Application accepted and project started"
          : "Application rejected successfully",
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

// ==========================================
// My Projects - Client
// ==========================================
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Application.find({
      status: {
        $in: [
          "accepted",
          "in_progress",
          "pending_review",
          "changes_requested",
          "completed",
        ],
      },
    })
      .populate(
        "job",
        "title description budget deadline createdBy"
      )
      .populate(
        "freelancer",
        "name email avatar"
      )
      .sort({ updatedAt: -1 });

    const clientProjects = projects.filter(
      (project) =>
        project.job &&
        project.job.createdBy &&
        project.job.createdBy.toString() === req.user.id
    );

    return res.status(200).json({
      success: true,
      count: clientProjects.length,
      projects: clientProjects,
    });
  } catch (error) {
    console.error("Get Client Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Submit Project - Freelancer
// ==========================================
exports.submitProject = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const {
      message,
      liveDemoUrl,
      files,
    } = req.body;

    const application = await Application.findById(
      applicationId
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Only assigned freelancer can submit
    if (
      application.freelancer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // Project must be active
    if (
      ![
        "accepted",
        "in_progress",
        "changes_requested",
      ].includes(application.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project cannot be submitted in its current status",
      });
    }

    // At least one submission item is required
    if (
      !message?.trim() &&
      !liveDemoUrl?.trim() &&
      (!files || files.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one submission item",
      });
    }

    application.submission = {
      message: message?.trim() || "",
      liveDemoUrl: liveDemoUrl?.trim() || "",
      files: Array.isArray(files) ? files : [],
      submittedAt: new Date(),
      reviewedAt: null,
      reviewMessage: "",
    };

    application.status = "pending_review";

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Project submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Submit Project Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Approve Project Submission - Client
// ==========================================
exports.approveSubmission = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(
      applicationId
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.job.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    if (application.status !== "pending_review") {
      return res.status(400).json({
        success: false,
        message: "This project is not pending review",
      });
    }

    application.status = "completed";

    if (application.submission) {
      application.submission.reviewedAt = new Date();
      application.submission.reviewMessage =
        "Submission approved by client.";
    }

    await application.save();

    return res.status(200).json({
      success: true,
      message:
        "Project submission approved successfully",
      application,
    });
  } catch (error) {
    console.error("Approve Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Request Changes - Client
// ==========================================
exports.requestSubmissionChanges = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { reviewMessage } = req.body;

    const application = await Application.findById(
      applicationId
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.job.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    if (application.status !== "pending_review") {
      return res.status(400).json({
        success: false,
        message: "This project is not pending review",
      });
    }

    application.status = "changes_requested";

    if (application.submission) {
      application.submission.reviewedAt = new Date();
      application.submission.reviewMessage =
        reviewMessage?.trim() ||
        "Changes requested by client.";
    }

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Changes requested successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Request Submission Changes Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};