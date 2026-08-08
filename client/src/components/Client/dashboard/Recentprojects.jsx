import { Link } from "react-router-dom";
import {
  FolderKanban,
  CalendarDays,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    freelancer: "Rahul Sharma",
    budget: "₹35,000",
    deadline: "15 Aug 2026",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Portfolio Website",
    freelancer: "Priya Verma",
    budget: "₹12,000",
    deadline: "10 Aug 2026",
    progress: 90,
    status: "Review",
  },
  {
    id: 3,
    title: "Mobile App UI Design",
    freelancer: "Aman Singh",
    budget: "₹28,000",
    deadline: "20 Aug 2026",
    progress: 45,
    status: "In Progress",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";

    case "Review":
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";

    case "Completed":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";

    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
  }
};

const RecentProjects = () => {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Projects
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your latest active projects.
          </p>
        </div>

        <Link
          to="/client/project"
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:shadow-md dark:border-slate-800"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-500/20">
                  <FolderKanban
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Freelancer: {project.freelancer}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <IndianRupee size={15} />
                      {project.budget}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays size={15} />
                      {project.deadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="w-full lg:w-72">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>

                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;