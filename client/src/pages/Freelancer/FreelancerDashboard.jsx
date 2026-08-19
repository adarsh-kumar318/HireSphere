import {
  WelcomeBanner,
  StatCard,
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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={dashboard?.accepted ?? 0}
          icon={BriefcaseBusiness}
          color="bg-blue-600"
          change=""
        />

        <StatCard
          title="Total Earnings"
          value="$0"
          icon={Wallet}
          color="bg-green-600"
          change=""
        />

        <StatCard
          title="Reputation"
          value="0"
          icon={Star}
          color="bg-yellow-500"
          change=""
        />

        <StatCard
          title="Portfolio Items"
          value="0"
          icon={FolderKanban}
          color="bg-purple-600"
          change=""
        />
      </div>

      {/* Notifications + Reviews */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentNotifications />
        <RecentReviews />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default FreelancerDashboard;