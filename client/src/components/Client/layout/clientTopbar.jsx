import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Settings,
  UserCircle2,
  Menu,
} from "lucide-react";

const ClientTopbar = ({
  toggleSidebar,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-20 items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={toggleSidebar}
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="hidden w-96 items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800 md:flex">
            <Search
              size={18}
              className="text-slate-500"
            />

            <input
              type="text"
              placeholder="Search projects, gigs, freelancers..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-xl p-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Notification */}
          <button className="relative rounded-xl p-3 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Settings */}
          <Link
            to="/client/settings"
            className="rounded-xl p-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Settings size={20} />
          </Link>

          {/* Profile */}
          <Link
            to="/client/profile"
            className="ml-2 flex items-center gap-3"
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="h-11 w-11 rounded-full border-2 border-blue-500 object-cover"
            />

            <div className="hidden lg:block">
              <h4 className="text-sm font-semibold">
                Adarsh Kumar
              </h4>

              <p className="text-xs text-slate-500">
                Client
              </p>
            </div>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default ClientTopbar;