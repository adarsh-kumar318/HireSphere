const Availability = require("../models/Availability");

// GET /api/availability
const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOne({
      freelancer: req.user.id,
    });

    if (!availability) {
      return res.status(200).json({
        success: true,
        availability: null,
      });
    }

    res.status(200).json({
      success: true,
      availability,
    });
  } catch (error) {
    console.error("Get availability error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch availability",
    });
  }
};

// POST /api/availability
const saveAvailability = async (req, res) => {
  try {
    const {
      available,
      days,
      startTime,
      endTime,
      timezone,
      maxHours,
      shortNotice,
    } = req.body;

    const availability = await Availability.findOneAndUpdate(
      {
        freelancer: req.user.id,
      },
      {
        freelancer: req.user.id,
        available,
        days,
        startTime,
        endTime,
        timezone,
        maxHours,
        shortNotice,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Availability saved successfully",
      availability,
    });
  } catch (error) {
    console.error("Save availability error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save availability",
    });
  }
};

module.exports = {
  getAvailability,
  saveAvailability,
};