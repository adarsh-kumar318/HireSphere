import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  FolderKanban,
  FileText,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Post New Gig",
    description: "Create a new project and start receiving proposals.",
    icon: PlusCircle,
    color: "from-blue-500 to-indigo-600",
    path: "/client/postgigs",
  },
  {
    id: 2,
    title: "Find Freelancer",
    description: "Browse skilled freelancers for your project.",
    icon: Search,
    color: "from-emerald-500 to-teal-600",
    path: "/client/findfreelancer",
  },
  {
    id: 3,
    title: "Manage Projects",
    description: "Track progress and manage active projects.",
    icon: FolderKanban,
    color: "from-violet-500 to-purple-600",
    path: "/client/project",
  },
  {
    id: 4,
    title: "View Proposals",
    description: "Review and respond to freelancer proposals.",
    icon: FileText,
    color: "from-amber-500 to-orange-600",
    path: "/client/proposal",
  },
];

const QuickActions = () => {
  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Frequently used shortcuts to manage your work faster.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.id}
              to={action.path}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color} text-white`}
              >
                <Icon size={26} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                Open
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;