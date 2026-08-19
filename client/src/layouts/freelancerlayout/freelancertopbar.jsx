import ProfileDropdown from "./profiledropdown";
import { Menu, Search, Bell } from "lucide-react";

const FreelancerTopbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 rounded-xl border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="relative rounded-xl p-2 text-slate-300 transition hover:bg-slate-800">
          <Bell size={22} />

          <span className="absolute right-1 top-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>

            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </span>
        </button>

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default FreelancerTopbar;