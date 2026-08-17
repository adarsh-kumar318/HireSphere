const Company = require("../models/Company");

// =====================================
// Create Company
// =====================================
exports.createCompany = async (req, res) => {
  try {
    const { companyName, email, website, industry, location, description, logo } =
      req.body;

    if (!companyName || !email || !industry || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required",
      });
    }

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    const company = await Company.create({
      companyName,
      email,
      website,
      industry,
      location,
      description,
      logo,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get My Company
// =====================================
exports.getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      createdBy: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Company By ID
// =====================================
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Company
// =====================================
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    if (company.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own company",
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Company
// =====================================
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    if (company.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own company",
      });
    }

    await Company.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};