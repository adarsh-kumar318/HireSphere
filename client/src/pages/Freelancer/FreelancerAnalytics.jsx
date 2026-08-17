import { useEffect, useState } from "react";

import {
  FiCreditCard,
  FiEye,
  FiMessageSquare,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

import PageHeader from "../../components/Common/PageHeader";
import api from "../../services/api";

function FreelancerAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [monthsCount, setMonthsCount] = useState(6);

  // =====================================
  // Fetch Analytics
  // =====================================
  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      try {
        const response = await api.get("/analytics");

        console.log("ANALYTICS RESPONSE:", response.data);

        if (cancelled) return;

        if (response.data?.success) {
          setAnalytics(response.data.analytics || {});
        } else {
          setAnalytics(response.data || {});
        }
      } catch (err) {
        if (cancelled) return;

        console.error("ANALYTICS ERROR:", err);
        console.error("STATUS:", err.response?.status);
        console.error("DATA:", err.response?.data);
        console.error("URL:", err.config?.url);

        setError(
          err.response?.data?.message ||
            "Unable to load analytics data."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================
  // Retry
  // =====================================
  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/analytics");

      console.log("ANALYTICS RETRY RESPONSE:", response.data);

      if (response.data?.success) {
        setAnalytics(response.data.analytics || {});
      } else {
        setAnalytics(response.data || {});
      }
    } catch (err) {
      console.error("ANALYTICS RETRY ERROR:", err);
      console.error("STATUS:", err.response?.status);
      console.error("DATA:", err.response?.data);

      setError(
        err.response?.data?.message ||
          "Unable to load analytics data."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Loading
  // =====================================
  if (loading) {
    return (
      <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">
        <PageHeader
          title="Analytics"
          subtitle="Track your earnings, projects, applications and performance."
        />

        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-violet-300" />

            <p className="mt-3 text-xs text-slate-400">
              Loading analytics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // Error
  // =====================================
  if (error) {
    return (
      <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">
        <PageHeader
          title="Analytics"
          subtitle="Track your earnings, projects, applications and performance."
        />

        <div className="mt-5 rounded-xl border border-red-500/20 bg-[#1c2a40] p-6 text-center">
          <p className="text-sm font-medium text-red-400">
            {error}
          </p>

          <button
            onClick={handleRetry}
            className="mt-4 rounded-lg bg-violet-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-violet-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // Analytics Data
  // =====================================

  const data = analytics || {};

  // Backend:
  // earnings: {
  //   total,
  //   thisMonth
  // }
  const earningsData = data.earnings || {};

  const earnings = Number(
    earningsData.thisMonth || 0
  );

  const totalEarnings = Number(
    earningsData.total || 0
  );

  // Backend:
  // applications: {
  //   total,
  //   pending,
  //   accepted,
  //   rejected
  // }
  const applicationsData =
    data.applications || {};

  const applications = Number(
    applicationsData.total || 0
  );

  // Backend currently returns null
  const rating = data.rating;

  // Backend currently returns null
  const profileViews = data.profileViews;

  // =====================================
  // Project Stats
  // =====================================

  // Backend:
  // projects: {
  //   active,
  //   completed,
  //   underReview
  // }
  const projectsData = data.projects || {};

  const activeProjects = Number(
    projectsData.active || 0
  );

  const completedProjects = Number(
    projectsData.completed || 0
  );

  const reviewProjects = Number(
    projectsData.underReview || 0
  );

  // =====================================
  // Monthly Earnings
  // =====================================

  // Backend:
  // [
  //   {
  //     label: "Mar",
  //     revenue: 5000
  //   }
  // ]
  const monthlyEarnings = Array.isArray(
    data.monthlyEarnings
  )
    ? data.monthlyEarnings
    : [];

  const visibleMonthlyEarnings =
    monthlyEarnings.slice(0, monthsCount);

  const months = visibleMonthlyEarnings.map(
    (item) => item.label
  );

  // =====================================
  // Project Percentages
  // =====================================

  const totalProjects =
    activeProjects +
    completedProjects +
    reviewProjects;

  const inProgressPercentage =
    totalProjects > 0
      ? Math.round(
          (activeProjects / totalProjects) * 100
        )
      : 0;

  const reviewPercentage =
    totalProjects > 0
      ? Math.round(
          (reviewProjects / totalProjects) * 100
        )
      : 0;

  const completedPercentage =
    totalProjects > 0
      ? Math.round(
          (completedProjects / totalProjects) * 100
        )
      : 0;

  // =====================================
  // Stat Cards
  // =====================================

  const stats = [
    {
      label: "Earnings",
      value: `₹${earnings.toLocaleString("en-IN")}`,
      subtitle: "This month",
      icon: FiCreditCard,
    },

    {
      label: "Rating",
      value:
        rating !== null &&
        rating !== undefined
          ? Number(rating).toFixed(1)
          : "—",
      subtitle: "Based on reviews",
      icon: FiTrendingUp,
    },

    {
      label: "Applications",
      value: applications,
      subtitle: "Total applications",
      icon: FiMessageSquare,
    },

    {
      label: "Profile Views",
      value:
        profileViews !== null &&
        profileViews !== undefined
          ? profileViews
          : "—",
      subtitle:
        profileViews !== null &&
        profileViews !== undefined
          ? "Total profile views"
          : "No data available",
      icon: FiEye,
    },
  ];

  // =====================================
  // Project Stats
  // =====================================

  const projectStats = [
    {
      label: "Active",
      value: activeProjects,
    },

    {
      label: "Completed",
      value: completedProjects,
    },

    {
      label: "Under Review",
      value: reviewProjects,
    },
  ];

  // =====================================
  // Render
  // =====================================

  return (
    <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">

      {/* ================= HEADER ================= */}

      <PageHeader
        title="Analytics"
        subtitle="Track your earnings, projects, applications and performance."
      />

      {/* ================= OVERVIEW ================= */}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Overview
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Here’s how things are going with your projects today.
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">
            Total Earnings
          </p>

          <p className="mt-1 text-xl font-bold text-violet-300">
            ₹{totalEarnings.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-lg font-semibold text-white">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {stat.subtitle}
                  </p>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#26344a]">
                  <Icon
                    size={13}
                    className="text-violet-300"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= PROJECT + MONTHLY ================= */}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[180px_1fr]">

        {/* ================= PROJECT STATS ================= */}

        <section className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4">
          <h3 className="text-sm font-semibold text-white">
            Project Stats
          </h3>

          <p className="mt-1 text-[10px] text-slate-400">
            Summary of your current workload.
          </p>

          <div className="mt-4 space-y-2">
            {projectStats.map((project, index) => (
              <div
                key={project.label}
                className="flex items-center justify-between rounded-md border border-[#334258] bg-[#102238] px-2.5 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === 0
                        ? "bg-emerald-400"
                        : index === 1
                        ? "bg-violet-300"
                        : "bg-amber-400"
                    }`}
                  />

                  <span className="text-[10px] text-slate-300">
                    {project.label}
                  </span>
                </div>

                <span className="text-[10px] font-semibold text-white">
                  {project.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= MONTHLY EARNINGS ================= */}

        <section className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Monthly Earnings
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Your earnings over the selected period.
              </p>
            </div>

            <select
              value={monthsCount}
              onChange={(e) =>
                setMonthsCount(
                  Number(e.target.value)
                )
              }
              className="rounded-md border border-[#334258] bg-[#102238] px-2 py-1 text-[9px] text-slate-300 outline-none"
            >
              <option value="6">
                Last 6 Months
              </option>

              <option value="12">
                Last 12 Months
              </option>
            </select>
          </div>

          {/* ================= CHART ================= */}

          <div className="relative mt-5 h-44">

            {/* Grid */}

            <div className="absolute inset-x-0 top-0 border-t border-[#29384d]" />

            <div className="absolute inset-x-0 top-1/3 border-t border-[#29384d]" />

            <div className="absolute inset-x-0 top-2/3 border-t border-[#29384d]" />

            <div className="absolute inset-x-0 bottom-0 border-t border-[#29384d]" />

            {/* Y Axis */}

            <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-[8px] text-slate-500">
              <span>₹5k</span>
              <span>₹2.5k</span>
              <span>₹0</span>
            </div>

            {/* Chart */}

            {visibleMonthlyEarnings.length === 0 ? (
              <div className="ml-8 flex h-full items-center justify-center">
                <div className="flex flex-col items-center">
                  <FiActivity
                    size={22}
                    className="text-slate-600"
                  />

                  <p className="mt-2 text-[10px] text-slate-500">
                    No earnings data available
                  </p>
                </div>
              </div>
            ) : (
              <div className="ml-8 flex h-full items-end justify-between gap-2 px-2">
                {visibleMonthlyEarnings.map(
                  (item, index) => {
                    // IMPORTANT:
                    // Backend sends "revenue", NOT "amount"
                    const amount =
                      Number(item.revenue) || 0;

                    const maxAmount = Math.max(
                      ...visibleMonthlyEarnings.map(
                        (month) =>
                          Number(month.revenue) || 0
                      ),
                      5000
                    );

                    const height =
                      amount > 0
                        ? Math.max(
                            (amount / maxAmount) *
                              100,
                            4
                          )
                        : 0;

                    return (
                      <div
                        key={`${item.label}-${index}`}
                        className="flex h-full flex-1 items-end justify-center"
                      >
                        <div
                          title={`₹${amount.toLocaleString(
                            "en-IN"
                          )}`}
                          className="w-full max-w-[28px] rounded-t-md bg-violet-300 transition-all hover:bg-violet-200"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {/* X Axis */}

            <div className="absolute bottom-[-18px] left-8 right-0 flex justify-between">
              {months.map((month, index) => (
                <span
                  key={`${month}-${index}`}
                  className="text-[8px] text-slate-500"
                >
                  {month}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ================= PROJECT BREAKDOWN ================= */}

      <section className="mt-3 rounded-xl border border-[#26364c] bg-[#1c2a40] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Projects Breakdown
            </h3>

            <p className="mt-1 text-[10px] text-slate-400">
              Distribution of your projects by status.
            </p>
          </div>

          <span className="text-[9px] text-slate-500">
            Real-time
          </span>
        </div>

        <div className="mt-5 space-y-4">

          {/* In Progress */}

          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[10px] text-slate-300">
                In Progress
              </span>

              <span className="text-[9px] text-slate-500">
                {activeProjects}
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#0d1d30]">
              <div
                className="h-full rounded-full bg-violet-300 transition-all"
                style={{
                  width: `${inProgressPercentage}%`,
                }}
              />
            </div>
          </div>

          {/* Under Review */}

          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[10px] text-slate-300">
                Under Review
              </span>

              <span className="text-[9px] text-slate-500">
                {reviewProjects}
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#0d1d30]">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{
                  width: `${reviewPercentage}%`,
                }}
              />
            </div>
          </div>

          {/* Completed */}

          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[10px] text-slate-300">
                Completed
              </span>

              <span className="text-[9px] text-slate-500">
                {completedProjects}
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#0d1d30]">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{
                  width: `${completedPercentage}%`,
                }}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default FreelancerAnalytics;