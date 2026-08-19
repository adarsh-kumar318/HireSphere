import { useEffect, useState } from "react";
import {
  Search,
  PlusCircle,
  FileText,
  MessageSquare,
  BriefcaseBusiness,
  CreditCard,
  CheckCircle2,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

import PageHeader from "../../components/Common/PageHeader";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import Card from "../../components/ui/Card";
import { getClientDashboard } from "../../services/dashboardService";

const ClientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const data = await getClientDashboard();

        setDashboard(data.dashboard || data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load client dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading client dashboard..." />;
  }

  const stats = [
    {
      label: "Active Projects",
      value: dashboard?.activeProjects ?? 0,
      icon: BriefcaseBusiness,
      iconStyle: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Total Spending",
      value: dashboard?.totalSpending
        ? `₹${dashboard.totalSpending.toLocaleString("en-IN")}`
        : "₹0",
      icon: CreditCard,
      iconStyle: "bg-cyan-500/10 text-cyan-400",
      suffix: "This Month",
    },
    {
      label: "Proposals Received",
      value: dashboard?.totalApplications ?? 0,
      icon: FileText,
      iconStyle: "bg-purple-500/10 text-purple-400",
    },
    {
      label: "Completed Projects",
      value: dashboard?.completedProjects ?? 0,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-500/10 text-emerald-400",
    },
  ];

  const recentProjects = dashboard?.recentProjects || [];

  const quickActions = [
    {
      title: "Find Talent",
      description: "Find skilled freelancers",
      icon: Search,
      path: "/client/freelancers",
    },
    {
      title: "Post Job",
      description: "Create a new project",
      icon: PlusCircle,
      path: "/client/jobs/create",
    },
    {
      title: "Proposals",
      description: "Review received proposals",
      icon: FileText,
      path: "/client/proposals",
    },
    {
      title: "Messages",
      description: "Chat with freelancers",
      icon: MessageSquare,
      path: "/client/messages",
    },
  ];

  return (
    <div className="min-h-full bg-slate-950">
      <PageHeader
        title="Client Dashboard"
        subtitle="Manage your projects, find talented freelancers, and keep your work moving forward."
      />

      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg md:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-600/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400">
                {new Date().getHours() < 12
                  ? "Good Morning"
                  : new Date().getHours() < 18
                  ? "Good Afternoon"
                  : "Good Evening"}
              </p>

              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Welcome back 👋
              </h1>

              <p className="mt-3 text-slate-400">
                Manage your projects, find talented freelancers, and keep your
                work moving forward.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
              >
                <Search size={18} />
                Find Freelancers
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                <PlusCircle size={18} />
                Post a Job
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.label}
                className="group relative overflow-hidden border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-500/30"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon size={21} />
                  </div>

                  {stat.suffix && (
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-400">{stat.label}</p>

                <h2 className="mt-1 text-3xl font-bold text-white">
                  {stat.value}
                </h2>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Projects */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/70 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <h2 className="text-lg font-semibold text-white">
                Recent Projects
              </h2>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            {recentProjects.length === 0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-500">
                  <BriefcaseBusiness size={22} />
                </div>

                <h3 className="font-semibold text-white">
                  No projects yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-slate-400">
                  Your recent projects will appear here once you start working
                  with freelancers.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50">
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                        Project
                      </th>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                        Budget
                      </th>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentProjects.map((project) => (
                      <tr
                        key={project.id || project._id}
                        className="border-b border-slate-800/60 transition hover:bg-slate-800/30"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-200">
                            {project.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {project.createdAt
                              ? new Date(
                                  project.createdAt
                                ).toLocaleDateString("en-IN")
                              : "Recently updated"}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                            {project.status || "In Progress"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-300">
                          {project.budget
                            ? `₹${project.budget.toLocaleString("en-IN")}`
                            : "—"}
                        </td>

                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="text-slate-400 transition hover:text-cyan-400"
                          >
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="border-t-2 border-slate-800 border-t-cyan-500 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    type="button"
                    className="group flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-slate-700/70 bg-slate-800/50 p-4 text-center transition-all hover:border-cyan-500/30 hover:bg-cyan-900/20"
                  >
                    <Icon
                      size={23}
                      className="mb-2 text-slate-400 transition group-hover:text-cyan-400"
                    />

                    <span className="text-sm font-medium text-slate-200">
                      {action.title}
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      {action.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;