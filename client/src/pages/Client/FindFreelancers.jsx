import { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiRefreshCw,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

import PageHeader from "../../components/Common/PageHeader";
import { searchFreelancers } from "../../services/marketplaceService";

function FindFreelancers() {
  const [freelancers, setFreelancers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState("");

  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  // ==========================================
  // Fetch Freelancers
  // ==========================================
  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (skill.trim()) {
        params.skill = skill.trim();
      }

      if (experience) {
        params.experience = experience;
      }

      if (rating) {
        params.rating = rating;
      }

      if (availability) {
        params.availability = availability;
      }

      if (minRate) {
        params.minRate = minRate;
      }

      if (maxRate) {
        params.maxRate = maxRate;
      }

      const response = await searchFreelancers(params);

      console.log("FREELANCERS RESPONSE:", response);

      if (response?.success) {
        setFreelancers(
          Array.isArray(response.freelancers)
            ? response.freelancers
            : []
        );
      } else {
        setFreelancers([]);
        setError(
          response?.message ||
            "Unable to load freelancers."
        );
      }
    } catch (err) {
      console.error(
        "FREELANCERS ERROR:",
        err
      );

      console.error(
        "STATUS:",
        err.response?.status
      );

      console.error(
        "DATA:",
        err.response?.data
      );

      setFreelancers([]);

      setError(
        err.response?.data?.message ||
          "Unable to load freelancers."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    fetchFreelancers();
  }, []);

  // ==========================================
  // Apply Filters
  // ==========================================
  const handleApplyFilters = () => {
    fetchFreelancers();
  };

  // ==========================================
  // Clear Filters
  // ==========================================
  const handleClearFilters = () => {
    setSearch("");
    setSkill("");
    setExperience("");
    setRating("");
    setAvailability("");
    setMinRate("");
    setMaxRate("");

    setTimeout(() => {
      fetchFreelancers();
    }, 0);
  };

  // ==========================================
  // Helpers
  // ==========================================
  const getName = (freelancer) => {
    return (
      freelancer?.name ||
      freelancer?.user?.name ||
      "Freelancer"
    );
  };

  const getAvatar = (freelancer) => {
    return (
      freelancer?.avatar ||
      freelancer?.user?.avatar ||
      ""
    );
  };

  const getSkills = (freelancer) => {
    if (Array.isArray(freelancer?.skills)) {
      return freelancer.skills;
    }

    if (Array.isArray(freelancer?.user?.skills)) {
      return freelancer.user.skills;
    }

    return [];
  };

  const getRating = (freelancer) => {
    return (
      freelancer?.rating ??
      freelancer?.averageRating ??
      freelancer?.user?.rating ??
      0
    );
  };

  const getExperience = (freelancer) => {
    return (
      freelancer?.experience ??
      freelancer?.experienceYears ??
      freelancer?.user?.experience ??
      0
    );
  };

  const getRate = (freelancer) => {
    return (
      freelancer?.hourlyRate ??
      freelancer?.rate ??
      freelancer?.user?.hourlyRate ??
      0
    );
  };

  const getAvailability = (freelancer) => {
    return (
      freelancer?.availability ||
      freelancer?.user?.availability ||
      "Not specified"
    );
  };

  const getLocation = (freelancer) => {
    return (
      freelancer?.location ||
      freelancer?.user?.location ||
      ""
    );
  };

  const getBio = (freelancer) => {
    return (
      freelancer?.bio ||
      freelancer?.user?.bio ||
      "No profile description available."
    );
  };

  // ==========================================
  // Freelancer Card
  // ==========================================
  const FreelancerCard = ({ freelancer }) => {
    const name = getName(freelancer);
    const avatar = getAvatar(freelancer);
    const skills = getSkills(freelancer);
    const freelancerRating = getRating(freelancer);
    const freelancerExperience =
      getExperience(freelancer);
    const rate = getRate(freelancer);
    const freelancerAvailability =
      getAvailability(freelancer);
    const location = getLocation(freelancer);
    const bio = getBio(freelancer);

    return (
      <div className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-5 transition hover:border-[#3b4d68]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-12 w-12 shrink-0 rounded-full border border-[#334258] object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#26344a] text-base font-semibold text-violet-300">
                {name
                  ?.charAt(0)
                  ?.toUpperCase() || "F"}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {name}
              </h3>

              {location && (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <FiMapPin size={10} />
                  <span className="truncate">
                    {location}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1">
            <FiStar
              size={11}
              className="fill-current text-amber-400"
            />

            <span className="text-[10px] font-medium text-amber-400">
              {Number(freelancerRating).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 line-clamp-2 text-[10px] leading-relaxed text-slate-400">
          {bio}
        </p>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 6).map(
              (item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-md border border-[#334258] bg-[#102238] px-2 py-1 text-[9px] text-slate-300"
                >
                  {typeof item === "string"
                    ? item
                    : item?.name || item?.title}
                </span>
              )
            )}
          </div>
        )}

        {/* Details */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-[#334258] bg-[#102238] p-2.5">
            <div className="flex items-center gap-1">
              <FiBriefcase
                size={11}
                className="text-violet-300"
              />

              <span className="text-[8px] uppercase tracking-wide text-slate-500">
                Experience
              </span>
            </div>

            <p className="mt-1 text-xs font-semibold text-white">
              {freelancerExperience
                ? `${freelancerExperience} ${
                    Number(freelancerExperience) ===
                    1
                      ? "Year"
                      : "Years"
                  }`
                : "—"}
            </p>
          </div>

          <div className="rounded-lg border border-[#334258] bg-[#102238] p-2.5">
            <div className="flex items-center gap-1">
              <FiClock
                size={11}
                className="text-emerald-400"
              />

              <span className="text-[8px] uppercase tracking-wide text-slate-500">
                Availability
              </span>
            </div>

            <p className="mt-1 truncate text-xs font-semibold text-white">
              {freelancerAvailability}
            </p>
          </div>

          <div className="rounded-lg border border-[#334258] bg-[#102238] p-2.5">
            <p className="text-[8px] uppercase tracking-wide text-slate-500">
              Hourly Rate
            </p>

            <p className="mt-1 text-xs font-semibold text-white">
              {rate
                ? `₹${Number(rate).toLocaleString(
                    "en-IN"
                  )}/hr`
                : "—"}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-4 flex justify-end border-t border-[#26364c] pt-3">
          <button
            type="button"
            className="rounded-lg bg-violet-500 px-4 py-2 text-[10px] font-medium text-white transition hover:bg-violet-600"
          >
            View Profile
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">
        <PageHeader
          title="Find Freelancers"
          subtitle="Find skilled freelancers for your projects."
        />

        <div className="flex min-h-[450px] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-violet-300" />

            <p className="mt-3 text-xs text-slate-400">
              Finding freelancers...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================
  return (
    <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">
      <PageHeader
        title="Find Freelancers"
        subtitle="Find skilled freelancers for your projects."
      />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* ======================================
            LEFT FILTER SIDEBAR
        ======================================= */}
        <aside className="h-fit rounded-xl border border-[#26364c] bg-[#1c2a40] p-4 lg:sticky lg:top-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiFilter
                size={14}
                className="text-violet-300"
              />

              <h2 className="text-sm font-semibold text-white">
                Filters
              </h2>
            </div>

            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[9px] text-slate-500 transition hover:text-violet-300"
            >
              Clear all
            </button>
          </div>

          {/* Search */}
          <div className="mt-5">
            <label className="mb-1.5 block text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Search
            </label>

            <div className="relative">
              <FiSearch
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleApplyFilters();
                  }
                }}
                placeholder="Name or skill..."
                className="w-full rounded-lg border border-[#334258] bg-[#102238] py-2.5 pl-9 pr-3 text-[10px] text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
              />
            </div>
          </div>

          {/* Skill */}
          <div className="mt-4">
            <label className="mb-1.5 block text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Skill
            </label>

            <input
              type="text"
              value={skill}
              onChange={(e) =>
                setSkill(e.target.value)
              }
              placeholder="e.g. React"
              className="w-full rounded-lg border border-[#334258] bg-[#102238] px-3 py-2.5 text-[10px] text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
            />
          </div>

          {/* Experience */}
          <div className="mt-4">
            <label className="mb-1.5 block text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Experience
            </label>

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              className="w-full rounded-lg border border-[#334258] bg-[#102238] px-3 py-2.5 text-[10px] text-white outline-none focus:border-violet-400/50"
            >
              <option value="">
                Any experience
              </option>
              <option value="0-1">
                0–1 years
              </option>
              <option value="1-3">
                1–3 years
              </option>
              <option value="3-5">
                3–5 years
              </option>
              <option value="5+">
                5+ years
              </option>
            </select>
          </div>

          {/* Rating */}
          <div className="mt-4">
            <label className="mb-1.5 block text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Minimum Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
              className="w-full rounded-lg border border-[#334258] bg-[#102238] px-3 py-2.5 text-[10px] text-white outline-none focus:border-violet-400/50"
            >
              <option value="">
                Any rating
              </option>
              <option value="4">
                4.0+ stars
              </option>
              <option value="4.5">
                4.5+ stars
              </option>
              <option value="4.8">
                4.8+ stars
              </option>
            </select>
          </div>

          {/* Availability */}
          <div className="mt-4">
            <label className="mb-1.5 block text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Availability
            </label>

            <select
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value)
              }
              className="w-full rounded-lg border border-[#334258] bg-[#102238] px-3 py-2.5 text-[10px] text-white outline-none focus:border-violet-400/50"
            >
              <option value="">
                Any availability
              </option>
              <option value="available">
                Available
              </option>
              <option value="busy">
                Busy
              </option>
            </select>
          </div>

          {/* Rate */}
          <div className="mt-4">
            <label className="mb-1.5 block text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Hourly Rate
            </label>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="0"
                value={minRate}
                onChange={(e) =>
                  setMinRate(e.target.value)
                }
                placeholder="Min ₹"
                className="w-full rounded-lg border border-[#334258] bg-[#102238] px-3 py-2.5 text-[10px] text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
              />

              <input
                type="number"
                min="0"
                value={maxRate}
                onChange={(e) =>
                  setMaxRate(e.target.value)
                }
                placeholder="Max ₹"
                className="w-full rounded-lg border border-[#334258] bg-[#102238] px-3 py-2.5 text-[10px] text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
              />
            </div>
          </div>

          {/* Apply */}
          <button
            type="button"
            onClick={handleApplyFilters}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-[10px] font-medium text-white transition hover:bg-violet-600"
          >
            <FiFilter size={12} />
            Apply Filters
          </button>
        </aside>

        {/* ======================================
            RIGHT RESULTS
        ======================================= */}
        <main className="min-w-0">
          {/* Results Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-white">
                Freelancers
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                {freelancers.length} freelancer
                {freelancers.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            <button
              type="button"
              onClick={fetchFreelancers}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#334258] bg-[#102238] px-3 py-2 text-[9px] font-medium text-slate-300 transition hover:border-[#465a77] hover:text-white"
            >
              <FiRefreshCw size={11} />
              Refresh
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-[#1c2a40] p-5">
              <div className="flex items-center gap-2">
                <FiAlertCircle
                  size={16}
                  className="text-red-400"
                />

                <p className="text-xs text-red-400">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchFreelancers}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2 text-[9px] font-medium text-white hover:bg-violet-600"
              >
                <FiRefreshCw size={11} />
                Try Again
              </button>
            </div>
          )}

          {/* Active Filters */}
          {(search ||
            skill ||
            experience ||
            rating ||
            availability ||
            minRate ||
            maxRate) && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-[9px] text-slate-500">
                Active filters:
              </span>

              {search && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2a40] px-2.5 py-1 text-[9px] text-slate-300">
                  Search: {search}
                </span>
              )}

              {skill && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2a40] px-2.5 py-1 text-[9px] text-slate-300">
                  Skill: {skill}
                </span>
              )}

              {experience && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2a40] px-2.5 py-1 text-[9px] text-slate-300">
                  Experience: {experience}
                </span>
              )}

              {rating && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2a40] px-2.5 py-1 text-[9px] text-slate-300">
                  Rating: {rating}+
                </span>
              )}

              {availability && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2a40] px-2.5 py-1 text-[9px] text-slate-300">
                  {availability}
                </span>
              )}

              {(minRate || maxRate) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2a40] px-2.5 py-1 text-[9px] text-slate-300">
                  ₹{minRate || 0} - ₹
                  {maxRate || "∞"}
                </span>
              )}

              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-[9px] text-violet-300 hover:text-violet-200"
              >
                <FiX size={10} />
                Clear
              </button>
            </div>
          )}

          {/* Results */}
          {freelancers.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-[#26364c] bg-[#102238] px-5 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c2a40]">
                <FiSearch
                  size={18}
                  className="text-slate-500"
                />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-300">
                No freelancers found
              </p>

              <p className="mt-1 max-w-sm text-[10px] text-slate-500">
                Try changing your search or
                filters to find more freelancers.
              </p>

              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 rounded-lg bg-violet-500 px-4 py-2 text-[9px] font-medium text-white transition hover:bg-violet-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {freelancers.map((freelancer) => (
                <FreelancerCard
                  key={
                    freelancer?._id ||
                    freelancer?.id
                  }
                  freelancer={freelancer}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default FindFreelancers;