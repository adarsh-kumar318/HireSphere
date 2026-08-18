import {
  WelcomeBanner,
  StatCard,
  AnalyticsChart,
  RecentProjects,
  RecentNotifications,
  RecentReviews,
  QuickActions,
} from "../../components/freelancer/dashboard";

import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  BriefcaseBusiness,
  Wallet,
  Star,
  FolderKanban,
} from "lucide-react";

const FreelancerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/freelancer");

        if (response.data.success) {
          setDashboard(response.data.dashboard);
        }
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          err.response?.data?.message || "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BriefcaseBusiness}
          label="Active Projects"
          value={dashboard?.accepted ?? 0}
        />

        <StatCard
          icon={Wallet}
          label="Total Proposals"
          value={dashboard?.totalApplications ?? 0}
        />

        <StatCard
          icon={Star}
          label="Pending Proposals"
          value={dashboard?.pending ?? 0}
        />

        <StatCard
          icon={FolderKanban}
          label="Rejected Proposals"
          value={dashboard?.rejected ?? 0}
        />
      </div>

      {/* Analytics + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>

        <QuickActions />
      </div>

      {/* Projects + Notifications + Reviews */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentProjects />

        <div className="space-y-6">
          <RecentNotifications />
          <RecentReviews />
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;