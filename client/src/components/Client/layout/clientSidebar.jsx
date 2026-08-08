import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  BriefcaseBusiness,
  Search,
  FileText,
  CreditCard,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
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

const ClientSidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`sticky top-0 h-screen border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900
      ${collapsed ? "w-20" : "w-72"}`}
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              SkillSphere
            </h1>
            <p className="text-xs text-gray-500">
              Client Dashboard
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-2 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={22} />

              {!collapsed && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">
              Grow Faster 🚀
            </h3>

            <p className="mt-2 text-sm opacity-90">
              Hire top freelancers and manage your
              projects from one place.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ClientSidebar;