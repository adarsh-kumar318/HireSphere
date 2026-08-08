import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  BriefcaseBusiness,
  Search,
  FileText,
  CreditCard,
  Users,
  Bell,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/client/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/client/project",
    icon: FolderKanban,
  },
  {
    name: "Post Gig",
    path: "/client/postgigs",
    icon: PlusCircle,
  },
  {
    name: "My Gigs",
    path: "/client/mygigs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Find Freelancer",
    path: "/client/findfreelancer",
    icon: Search,
  },
  {
    name: "Proposals",
    path: "/client/proposal",
    icon: FileText,
  },
  {
    name: "Payments",
    path: "/client/payment",
    icon: CreditCard,
  },
  {
    name: "Collaboration",
    path: "/client/collaboration",
    icon: Users,
  },
  {
    name: "Notifications",
    path: "/client/notifications",
    icon: Bell,
  },
];

const ClientMobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 transform border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              SkillSphere
            </h2>
            <p className="text-xs text-slate-500">
              Client Dashboard
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Card */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-xl">
            <h3 className="font-semibold">
              Welcome 👋
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              Manage projects, hire freelancers and track payments from anywhere.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ClientMobileMenu;