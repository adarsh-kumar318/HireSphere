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
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Update Portfolio",
    description: "Add your latest completed work.",
    icon: FolderKanban,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    title: "View Proposals",
    description: "Track all submitted proposals.",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Edit Profile",
    description: "Keep your freelancer profile updated.",
    icon: UserCog,
    color: "bg-orange-100 text-orange-600",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              className="rounded-2xl border border-gray-100 p-5 text-left transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="font-semibold text-gray-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
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