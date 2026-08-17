const Application = require("../models/Application");
const Job = require("../models/Job");

const getAnalytics = async (req, res) => {
  try {
    const freelancerId = req.user.id;

    // ================= APPLICATIONS =================
    const applications = await Application.find({
      freelancer: freelancerId,
    }).populate("job", "title company");

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
      (application) => application.status === "pending"
    ).length;

    const acceptedApplications = applications.filter(
      (application) => application.status === "accepted"
    ).length;

    const rejectedApplications = applications.filter(
      (application) => application.status === "rejected"
    ).length;

    // ================= PROJECTS =================
    const activeProjects = acceptedApplications;

    // Current schema has no separate completed status.
    const completedProjects = 0;

    const underReviewProjects = pendingApplications;

    // ================= EARNINGS =================
    // This is the total accepted bid amount.
    // It is NOT confirmed payment data.
    const totalEarnings = applications
      .filter((application) => application.status === "accepted")
      .reduce(
        (total, application) =>
          total + Number(application.bidAmount || 0),
        0
      );

    // ================= THIS MONTH =================
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const thisMonthAccepted = applications.filter((application) => {
      return (
        application.status === "accepted" &&
        new Date(application.createdAt) >= startOfMonth
      );
    });

    const thisMonthEarnings = thisMonthAccepted.reduce(
      (total, application) =>
        total + Number(application.bidAmount || 0),
      0
    );

    // ================= MONTHLY EARNINGS =================
    const monthlyEarnings = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const nextMonth = new Date(
        now.getFullYear(),
        now.getMonth() - i + 1,
        1
      );

      const monthApplications = applications.filter((application) => {
        const createdAt = new Date(application.createdAt);

        return (
          application.status === "accepted" &&
          createdAt >= date &&
          createdAt < nextMonth
        );
      });

      const revenue = monthApplications.reduce(
        (total, application) =>
          total + Number(application.bidAmount || 0),
        0
      );

      monthlyEarnings.push({
        label: date.toLocaleString("en-US", {
          month: "short",
        }),
        revenue,
      });
    }

    // ================= PROJECT BREAKDOWN =================
    const projectBreakdown = {
      inProgress: activeProjects,
      underReview: underReviewProjects,
      completed: completedProjects,
    };

    // ================= RESPONSE =================
    return res.status(200).json({
      success: true,

      analytics: {
        earnings: {
          total: totalEarnings,
          thisMonth: thisMonthEarnings,
        },

        rating: null,

        applications: {
          total: totalApplications,
          pending: pendingApplications,
          accepted: acceptedApplications,
          rejected: rejectedApplications,
        },

        profileViews: null,

        projects: {
          active: activeProjects,
          completed: completedProjects,
          underReview: underReviewProjects,
        },

        monthlyEarnings,

        projectBreakdown,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};

module.exports = {
  getAnalytics,
};