import { Link } from 'react-router-dom'
import { FiMapPin, FiClock, FiUsers, FiArrowUpRight } from 'react-icons/fi'

function GigCard({ gig, action }) {
  const gigId = gig.id || gig._id

  const isStatusOpen =
    gig.status === 'Open' || gig.status === 'Active'

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#334155] bg-[#1E293B] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-black/20">

      {/* Top */}
      <div className="p-5">

        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            {gig.category || 'Services'}
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              isStatusOpen
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
            }`}
          >
            {gig.status || 'Open'}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-indigo-400">
          <Link
            to={`/gigs/${gigId}`}
            className="focus:outline-none"
          >
            {gig.title}
          </Link>
        </h3>

        {/* Client */}
        <p className="mb-4 text-sm text-slate-400">
          Posted by{' '}
          <span className="font-medium text-slate-300">
            {gig.client || 'Client'}
          </span>
        </p>

        {/* Job info */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">

          {gig.location && (
            <span className="flex items-center gap-1.5">
              <FiMapPin className="text-cyan-400" size={14} />
              {gig.location}
            </span>
          )}

          <span className="flex items-center gap-1.5">
            <FiClock className="text-cyan-400" size={14} />
            {gig.deliveryTime || 'Flexible'}
          </span>
        </div>

        {/* Description */}
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-400">
          {gig.description || 'No description available.'}
        </p>

      </div>

      {/* Bottom */}
      <div className="mt-auto border-t border-[#334155] px-5 py-4">

        <div className="mb-4 flex items-end justify-between gap-3">

          <div>
            <p className="mb-1 text-xs text-slate-500">
              Starting budget
            </p>

            <p className="text-lg font-bold text-white">
              {gig.budgetLabel ||
                `₹${Number(gig.budget || 0).toLocaleString('en-IN')}`}
            </p>
          </div>

          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-xs text-slate-400">
              <FiUsers size={13} />
              {gig.proposalsCount || 0} proposals
            </p>
          </div>

        </div>

        {/* Action */}
        {action ? (
          <div className="relative z-10">
            {action}
          </div>
        ) : (
          <Link
            to={`/gigs/${gigId}`}
            className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500"
          >
            View Details
            <FiArrowUpRight size={16} />
          </Link>
        )}

      </div>
    </div>
  )
}

export default GigCard