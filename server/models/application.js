const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bidAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    timeline: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
  type: String,
  enum: [
    "pending",
    "accepted",
    "rejected",
    "pending_review",
    "completed",
    "changes_requested",
  ],
  default: "pending",
},

    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // Project Submission
    // ==========================================

    submission: {
      message: {
        type: String,
        trim: true,
        default: "",
      },

      liveDemoUrl: {
        type: String,
        trim: true,
        default: "",
      },

      files: [
        {
          name: {
            type: String,
            trim: true,
          },

          url: {
            type: String,
            trim: true,
          },
        },
      ],

      submittedAt: {
        type: Date,
        default: null,
      },

      reviewedAt: {
        type: Date,
        default: null,
      },

      reviewMessage: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);