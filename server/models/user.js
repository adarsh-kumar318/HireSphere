const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "client",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false, // Sirf createdAt chahiye
    },
  }
);

module.exports = mongoose.model("User", userSchema);