const Job = require("../models/Job");

// ===============================
// Create Job
// ===============================
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    // Validation
    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create Job
    const newJob = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job Created Successfully",
      job: newJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Jobs
// ===============================
exports.getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      minSalary,
      maxSalary,
      page = 1,
      limit = 10,
    } = req.query;

    // Query Object
    let query = {};

    // Search by Title
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // Filter by Location
    if (location) {
      query.location = location;
    }

    // Filter by Salary
    if (minSalary || maxSalary) {
      query.salary = {};

      if (minSalary) {
        query.salary.$gte = Number(minSalary);
      }

      if (maxSalary) {
        query.salary.$lte = Number(maxSalary);
      }
    }

    // Pagination
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments(query);

    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Job
// ===============================
exports.getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Job
// ===============================
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Job
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Owner Check
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own jobs",
      });
    }

    // Update Job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Job
// ===============================
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Job
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Owner Check
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own jobs",
      });
    }

    // Delete Job
    await Job.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};