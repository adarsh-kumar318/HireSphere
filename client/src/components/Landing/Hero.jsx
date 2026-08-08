import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiStar,
  FiCheckCircle,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { TRENDING_SEARCHES } from "../../utils/constants";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Floating Cards — positions kept INSIDE the relative parent (no negative offsets)
const FLOATING_CARDS = [
  {
    id: 1,
    label: "Project Completed",
    value: "100%",
    sub: "Client Satisfaction",
    icon: <FiCheckCircle className="text-emerald-400" size={18} />,
    className: "top-4 left-0 animate-float",
  },
  {
    id: 2,
    label: "Average Rating",
    value: "4.9 ★",
    sub: "50K+ Reviews",
    icon: <FiStar className="text-yellow-400" size={18} />,
    className: "top-24 right-0 animate-float-delayed",
  },
  {
    id: 3,
    label: "Fast Delivery",
    value: "2 Days",
    sub: "Average Time",
    icon: <FiClock className="text-indigo-400" size={18} />,
    className: "bottom-4 left-4 animate-float",
  },
];

function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleTrending = (term) => {
    setQuery(term);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="hero-grid absolute inset-0 opacity-30"></div>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
              🚀 Trusted by 50,000+ Professionals
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl"
          >
            Find the Perfect{" "}
            <span className="gradient-text">Freelancer</span>
            <br />
            for Every Project
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-400"
          >
            Connect with verified freelancers, hire confidently, and
            build amazing digital products with the world's best talent.
          </motion.p>

          {/* Search */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSearch}
            className="mt-10 flex overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
          >
            <div className="flex flex-1 items-center px-4 sm:px-5">
              <FiSearch className="mr-3 flex-shrink-0 text-slate-400" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Freelancer, Skills..."
                className="w-full bg-transparent py-4 sm:py-5 text-white placeholder-slate-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="hidden sm:block bg-indigo-600 px-8 font-semibold text-white transition hover:bg-indigo-700"
            >
              Search
            </button>
          </motion.form>

          {/* Trending */}
          <motion.div
            variants={itemVariants}
            className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3"
          >
            <span className="text-slate-500">Trending:</span>

            {TRENDING_SEARCHES.map((item) => (
              <button
                key={item}
                onClick={() => handleTrending(item)}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs sm:text-sm text-slate-300 transition hover:border-indigo-500 hover:text-indigo-400"
              >
                {item}
              </button>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              Hire Talent
              <FiArrowRight />
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
            >
              Become Freelancer
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side — visible on lg+ only */}
        <div className="relative hidden items-center justify-center lg:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="relative w-full max-w-md"
          >
            {/* Main Card */}
            <div className="glass-card p-8 text-center">
              <div className="animate-pulse-glow mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500">
                <FiSearch
                  size={38}
                  className="text-white"
                />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-white">
                Smart AI Matching
              </h2>

              <p className="mb-6 text-slate-400">
                Our intelligent recommendation engine instantly matches
                your project with the most suitable verified freelancers.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "React",
                  "Node.js",
                  "Python",
                  "Figma",
                  "AWS",
                  "MongoDB",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating Cards — inside relative parent, no negative offsets */}
            {FLOATING_CARDS.map((card) => (
              <div
                key={card.id}
                className={`glass-card absolute min-w-[170px] px-5 py-4 ${card.className}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  {card.icon}
                  <span className="text-xl font-bold text-white">
                    {card.value}
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  {card.label}
                </p>
                <p className="text-xs text-slate-500">
                  {card.sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;