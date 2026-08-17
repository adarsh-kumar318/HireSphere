import { useEffect, useState } from "react";
import {
  ChevronDown,
  Clock3,
  Check,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

function Availability() {
  const [available, setAvailable] = useState(true);

  const [days, setDays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [timezone, setTimezone] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [shortNotice, setShortNotice] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= GET AVAILABILITY =================
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/availability");

        const data = response.data?.availability;

        // No availability saved yet
        if (!data) {
          return;
        }

        setAvailable(data.available ?? true);

        setDays({
          Mon: data.days?.Mon ?? false,
          Tue: data.days?.Tue ?? false,
          Wed: data.days?.Wed ?? false,
          Thu: data.days?.Thu ?? false,
          Fri: data.days?.Fri ?? false,
          Sat: data.days?.Sat ?? false,
          Sun: data.days?.Sun ?? false,
        });

        setStartTime(data.startTime ?? "");
        setEndTime(data.endTime ?? "");
        setTimezone(data.timezone ?? "");
        setMaxHours(
          data.maxHours !== null && data.maxHours !== undefined
            ? String(data.maxHours)
            : ""
        );
        setShortNotice(data.shortNotice ?? "");
      } catch (err) {
        console.error("Fetch availability error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load availability"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  // ================= TOGGLE DAY =================
  const toggleDay = (day) => {
    setDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // ================= SAVE AVAILABILITY =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await api.post("/availability", {
        available,
        days,
        startTime,
        endTime,
        timezone,
        maxHours: maxHours === "" ? null : Number(maxHours),
        shortNotice,
      });

      setMessage(
        response.data?.message ||
          "Availability saved successfully"
      );
    } catch (err) {
      console.error("Save availability error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save availability"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#0F172A] text-white">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 size={18} className="animate-spin" />
          Loading availability...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0F172A] px-3 py-4 text-white sm:px-5">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-white">
          Availability
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Set when you are available to work.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ================= AVAILABILITY STATUS ================= */}
        <section className="rounded-xl border border-[#263449] bg-[#1E293B] p-4">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold text-white">
                Availability Status
              </h2>

              <p className="mt-1 text-[11px] text-slate-400">
                Let clients know if you are available.
              </p>
            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setAvailable(!available)}
              className={`relative h-6 w-11 rounded-full transition ${
                available
                  ? "bg-indigo-600"
                  : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  available
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

          <div className="mt-3 flex items-center gap-2">

            <span
              className={`h-2 w-2 rounded-full ${
                available
                  ? "bg-emerald-400"
                  : "bg-slate-500"
              }`}
            />

            <span className="text-xs text-slate-300">
              {available
                ? "Available for work"
                : "Currently unavailable"}
            </span>

          </div>

        </section>

        {/* ================= WORKING DAYS ================= */}
        <section className="rounded-xl border border-[#263449] bg-[#1E293B] p-4">

          <h2 className="text-sm font-semibold text-white">
            Working Days
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Select the days you are available to work.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            {Object.keys(days).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold transition ${
                  days[day]
                    ? "bg-indigo-600 text-white"
                    : "border border-[#334155] bg-[#0F172A] text-slate-400"
                }`}
              >
                {day.charAt(0)}
              </button>
            ))}

          </div>

        </section>

        {/* ================= WORKING HOURS ================= */}
        <section className="rounded-xl border border-[#263449] bg-[#1E293B] p-4">

          <div className="flex items-center gap-2">
            <Clock3
              size={15}
              className="text-indigo-400"
            />

            <h2 className="text-sm font-semibold text-white">
              Working Hours
            </h2>
          </div>

          <p className="mt-1 text-[11px] text-slate-400">
            Set your standard available hours.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">

            {/* Start Time */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-400">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className="h-9 w-full rounded-md border border-[#334155] bg-[#061a2e] px-2.5 text-xs text-slate-700 outline-none focus:border-indigo-500"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-400">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                className="h-9 w-full rounded-md border border-[#334155] bg-[#05182b] px-2.5 text-xs text-slate-700 outline-none focus:border-indigo-500"
              />
            </div>

          </div>

        </section>

        {/* ================= PREFERENCES ================= */}
        <section className="rounded-xl border border-[#263449] bg-[#1E293B] p-4">

          <h2 className="text-sm font-semibold text-white">
            Preferences
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Configure your availability preferences.
          </p>

          <div className="mt-3 space-y-3">

            {/* Timezone */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-400">
                Timezone
              </label>

              <div className="relative">
                <select
                  value={timezone}
                  onChange={(e) =>
                    setTimezone(e.target.value)
                  }
                  className="h-9 w-full appearance-none rounded-md border border-[#334155] bg-[#072645] px-2.5 pr-8 text-[11px] text-slate-700 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select timezone
                  </option>

                  <option value="Asia/Kolkata">
                    (GMT+05:30) India Standard Time
                  </option>

                  <option value="America/New_York">
                    (GMT-05:00) Eastern Time
                  </option>

                  <option value="Europe/London">
                    (GMT+00:00) London
                  </option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            {/* Maximum Hours */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-400">
                Maximum hours per week
              </label>

              <input
                type="number"
                min="1"
                max="168"
                value={maxHours}
                onChange={(e) =>
                  setMaxHours(e.target.value)
                }
                placeholder="40"
                className="h-9 w-full rounded-md border border-[#334155] bg-[#051728] px-2.5 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-500"
              />
            </div>

            {/* Short Notice */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-400">
                Short notice requirement
              </label>

              <div className="relative">
                <select
                  value={shortNotice}
                  onChange={(e) =>
                    setShortNotice(e.target.value)
                  }
                  className="h-9 w-full appearance-none rounded-md border border-[#334155] bg-[#020f1c] px-2.5 pr-8 text-[11px] text-slate-700 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select notice period
                  </option>

                  <option value="24">
                    24 hours notice
                  </option>

                  <option value="48">
                    48 hours notice
                  </option>

                  <option value="72">
                    72 hours notice
                  </option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

          </div>

        </section>

        {/* ================= STATUS MESSAGE ================= */}

        {message && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* ================= SAVE ================= */}
        <div className="flex justify-end pb-4">

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Check size={14} />
                Save Availability
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}

export default Availability;