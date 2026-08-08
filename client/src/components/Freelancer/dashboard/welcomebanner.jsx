import { ArrowRight, BriefcaseBusiness, Wallet } from "lucide-react";

const WelcomeBanner = () => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="bg-linear-to-r overflow-hidden rounded-3xl from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left */}
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-blue-100">
            {greeting}
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Welcome back, Adarsh 👋
          </h1>

          <p className="mt-4 text-blue-100">
            Manage your freelance work, monitor your earnings,
            collaborate with clients, and grow your reputation from one
            dashboard.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:scale-105">
            Browse Gigs
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right */}
        <div className="grid w-full max-w-md grid-cols-2 gap-4">
          <div className="bg-white/15 rounded-2xl p-5 backdrop-blur">
            <BriefcaseBusiness className="mb-3" size={28} />
            <p className="text-sm text-blue-100">Active Projects</p>
            <h3 className="mt-2 text-3xl font-bold">12</h3>
          </div>

          <div className="bg-white/15 rounded-2xl p-5 backdrop-blur">
            <Wallet className="mb-3" size={28} />
            <p className="text-sm text-blue-100">Total Earnings</p>
            <h3 className="mt-2 text-3xl font-bold">$2,450</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;