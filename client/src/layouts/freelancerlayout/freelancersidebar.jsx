import SidebarItem from "./sidebaritem";
import {
  LayoutDashboard,
  User,
  BriefcaseBusiness,
  Search,
  FolderKanban,
  BarChart3,
  Star,
  Bell,
  Clock3,
  LogOut,
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
    path: "/freelancer/marketplace",
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

const FreelancerSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 lg:flex">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-500">
          SkillSphere
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            to={item.path}
            icon={item.icon}
            title={item.name}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default FreelancerSidebar;