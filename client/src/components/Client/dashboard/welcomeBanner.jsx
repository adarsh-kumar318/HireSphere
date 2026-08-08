import { Link } from "react-router-dom";
import { PlusCircle, Search, ArrowRight } from "lucide-react";

const WelcomeBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl">
      {/* Background Blur */}
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
            👋 Welcome Back
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Build Amazing Projects with
            <br />
            Top Freelancers
          </h1>

          <p className="mt-4 max-w-xl text-blue-100">
            Post gigs, receive proposals, collaborate with skilled
            freelancers, and manage every project from one dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/client/postgigs"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
            >
              <PlusCircle size={20} />
              Post a Gig
            </Link>

            <Link
              to="/client/findfreelancer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <Search size={20} />
              Find Freelancer
            </Link>
          </div>
        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/15 rounded-2xl p-5 backdrop-blur">
            <h3 className="text-3xl font-bold">24</h3>
            <p className="mt-1 text-sm text-blue-100">
              Active Projects
            </p>
          </div>

          <div className="bg-white/15 rounded-2xl p-5 backdrop-blur">
            <h3 className="text-3xl font-bold">152</h3>
            <p className="mt-1 text-sm text-blue-100">
              Proposals Received
            </p>
          </div>

          <div className="bg-white/15 rounded-2xl p-5 backdrop-blur">
            <h3 className="text-3xl font-bold">18</h3>
            <p className="mt-1 text-sm text-blue-100">
              Freelancers Hired
            </p>
          </div>

          <div className="bg-white/15 rounded-2xl p-5 backdrop-blur">
            <h3 className="text-3xl font-bold">$12.5K</h3>
            <p className="mt-1 text-sm text-blue-100">
              Total Spending
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="relative z-10 mt-8 flex justify-end">
        <Link
          to="/client/project"
          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
        >
          View All Projects
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default WelcomeBanner;