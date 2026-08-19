import { useNavigate } from "react-router-dom";

import {
  PlusCircle,
  FolderKanban,
  FileText,
  UserCog,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Create New Gig",
    description: "Publish a new freelance service.",
    icon: PlusCircle,
    color: "bg-blue-500/15 text-blue-400",
  },
  {
    id: 2,
    title: "Update Portfolio",
    description: "Add your latest completed work.",
    icon: FolderKanban,
    color: "bg-purple-500/15 text-purple-400",
  },
  {
    id: 3,
    title: "View Proposals",
    description: "Track all submitted proposals.",
    icon: FileText,
    color: "bg-green-500/15 text-green-400",
  },
  {
    id: 4,
    title: "Edit Profile",
    description: "Keep your freelancer profile updated.",
    icon: UserCog,
    color: "bg-orange-500/15 text-orange-400",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              onClick={() => {
                if (action.title === "View Proposals") {
                  navigate("/freelancer/proposals");
                }

                if (action.title === "Update Portfolio") {
                  navigate("/freelancer/portfolio");
                }

                if (action.title === "Edit Profile") {
                  navigate("/freelancer/profile");
                }
              }}
              className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;