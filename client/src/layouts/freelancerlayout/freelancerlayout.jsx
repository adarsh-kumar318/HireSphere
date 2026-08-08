import { Outlet } from "react-router-dom";
import { useState } from "react";

import FreelancerSidebar from "./FreelancerSidebar";
import FreelancerTopbar from "./FreelancerTopbar";
import FreelancerMobileMenu from "./FreelancerMobileMenu";
import FreelancerBreadcrumb from "./FreelancerBreadcrumb";

const FreelancerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <FreelancerSidebar />

      {/* Mobile Sidebar */}
      <FreelancerMobileMenu
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex min-h-screen flex-col lg:ml-72">
        {/* Top Navigation */}
        <FreelancerTopbar
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <FreelancerBreadcrumb />

          <div className="mt-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancerLayout;