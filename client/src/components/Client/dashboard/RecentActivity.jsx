import {
  FileText,
  CreditCard,
  BriefcaseBusiness,
  UserCheck,
  FolderKanban,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New proposal received",
    description: "Rahul Sharma submitted a proposal for E-Commerce Website.",
    time: "10 min ago",
    icon: FileText,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Payment completed",
    description: "₹15,000 transferred successfully to Priya Verma.",
    time: "1 hour ago",
    icon: CreditCard,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  {
    id: 3,
    title: "New gig published",
    description: "Your React Developer gig is now live.",
    time: "Yesterday",
    icon: BriefcaseBusiness,
    color:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
  },
  {
    id: 4,
    title: "Freelancer hired",
    description: "Aman Singh accepted your hiring request.",
    time: "2 days ago",
    icon: UserCheck,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  },
  {
    id: 5,
    title: "Project updated",
    description: "Portfolio Website progress reached 90%.",
    time: "3 days ago",
    icon: FolderKanban,
    color:
      "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
  },
];

const RecentActivity = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Latest updates from your account.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 h-full w-px bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-8">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div key={activity.id} className="relative flex gap-5">
                {/* Icon */}
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${activity.color}`}
                >
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-slate-200 p-4 transition hover:shadow-md dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {activity.title}
                    </h3>

                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;