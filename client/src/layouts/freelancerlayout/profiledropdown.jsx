import { Link } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-gray-100"
      >
        <img
          src="https://ui-avatars.com/api/?name=Adarsh"
          alt="profile"
          className="h-10 w-10 rounded-full"
        />

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold">
            Adarsh
          </p>
          <p className="text-xs text-gray-500">
            Freelancer
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          <Link
            to="/freelancer/my-profile"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
          >
            <User size={18} />
            My Profile
          </Link>

          <Link
            to="/freelancer/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
          >
            <Settings size={18} />
            Settings
          </Link>

          <hr className="my-2" />

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;