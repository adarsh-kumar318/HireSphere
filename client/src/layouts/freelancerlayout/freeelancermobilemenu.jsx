import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  User,
  BriefcaseBusiness,
  Search,
  FolderKanban,
  BarChart3,
  Star,
  Bell,
  Clock3,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/freelancer/dashboard",
  },
  {
    name: "My Profile",
    icon: User,
    path: "/freelancer/my-profile",
  },
  {
    name: "Portfolio",
    icon: FolderKanban,
    path: "/freelancer/portfolio",
  },
  {
    name: "Availability",
    icon: Clock3,
    path: "/freelancer/availability",
  },
  {
    name: "Gig Market",
    icon: BriefcaseBusiness,
    path: "/freelancer/gig-market",
  },
  {
    name: "Browse Gigs",
    icon: Search,
    path: "/freelancer/browse-gigs",
  },
  {
    name: "Collaboration",
    icon: FolderKanban,
    path: "/freelancer/collaboration",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/freelancer/analytics",
  },
  {
    name: "Reputation",
    icon: Star,
    path: "/freelancer/reputation",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/freelancer/notifications",
  },
];

const FreelancerMobileMenu = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  if (!sidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl lg:hidden">
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b px-5">
          <h2 className="text-xl font-bold text-blue-600">
            SkillSphere
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default FreelancerMobileMenu;