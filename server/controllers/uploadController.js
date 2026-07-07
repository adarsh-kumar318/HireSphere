const User = require("../models/User");

// Upload Avatar
exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: req.file.path,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload Resume
exports.uploadResume = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        resume: req.file.path,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};