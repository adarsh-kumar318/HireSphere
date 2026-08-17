const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    days: {
      Mon: { type: Boolean, default: false },
      Tue: { type: Boolean, default: false },
      Wed: { type: Boolean, default: false },
      Thu: { type: Boolean, default: false },
      Fri: { type: Boolean, default: false },
      Sat: { type: Boolean, default: false },
      Sun: { type: Boolean, default: false },
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    timezone: {
      type: String,
      default: "",
    },

    maxHours: {
      type: Number,
      default: null,
    },

    shortNotice: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Availability", availabilitySchema);