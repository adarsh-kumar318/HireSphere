import {
  WelcomeBanner,
  StatCard,
  AnalyticsChart,
  RecentProjects,
  RecentNotifications,
  RecentReviews,
  QuickActions,
} from "../../components/freelancer/dashboard";

import {
  BriefcaseBusiness,
  Wallet,
  Star,
  FolderKanban,
} from "lucide-react";

const FreelancerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Projects"
          value="12"
          icon={BriefcaseBusiness}
          color="bg-blue-600"
          change="+12%"
        />

        <StatCard
          title="Total Earnings"
          value="$2,450"
          icon={Wallet}
          color="bg-green-600"
          change="+18%"
        />

        <StatCard
          title="Reputation"
          value="4.9"
          icon={Star}
          color="bg-yellow-500"
          change="+3%"
        />

        <StatCard
          title="Portfolio Items"
          value="24"
          icon={FolderKanban}
          color="bg-purple-600"
          change="+8%"
        />
      </div>

      {/* Analytics + Notifications */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AnalyticsChart />
        </div>

        <RecentNotifications />
      </div>

      {/* Projects + Reviews */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentProjects />
        <RecentReviews />
      </div>
      <QuickActions />
    </div>
  );
};

export default FreelancerDashboard;