/* ============================================================
   Popular Services Section
   Real API data from /marketplace/gigs with loading / empty states
   No fake data — empty state displayed if API is unavailable
   ============================================================ */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiBookmark, FiAlertCircle, FiRefreshCw } from 'react-icons/fi'
import { searchGigs } from '../../services/marketplaceService'

// ── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ── Skeleton card for loading state ────────────────────────────
function ServiceCardSkeleton() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
        </div>
      </div>
    </div>
  )
}

// ── Individual service card ─────────────────────────────────────
function ServiceCard({ gig }) {
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
    >
      {/* Service image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-900/30 to-cyan-900/20 overflow-hidden">
        {gig.image ? (
          <img
            src={gig.image}
            alt={gig.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">
              <FiStar size={24} className="text-indigo-400" />
            </div>
          </div>
        )}

        {/* Bookmark button */}
        <button
          onClick={() => setBookmarked((b) => !b)}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0F172A]/80 border border-[#334155] flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors"
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this service'}
        >
          <FiBookmark size={14} className={bookmarked ? 'fill-current text-indigo-400' : ''} />
        </button>
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Seller info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {(gig.seller?.name || gig.freelancer || 'F').charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-slate-400 font-medium truncate">
            {gig.seller?.name || gig.freelancer || 'Freelancer'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white mb-3 leading-snug line-clamp-2">
          {gig.title}
        </h3>

        {/* Rating */}
        {gig.rating && (
          <div className="flex items-center gap-1 mb-3">
            <FiStar size={12} className="text-amber-400 fill-current" />
            <span className="text-xs font-semibold text-amber-400">{gig.rating}</span>
            {gig.reviewCount && (
              <span className="text-xs text-slate-500">({gig.reviewCount})</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#334155]">
          {/* Delivery time */}
          {gig.deliveryTime && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <FiClock size={11} />
              <span>{gig.deliveryTime}</span>
            </div>
          )}
          {/* Price */}
          <div className="text-sm font-bold text-white">
            {gig.startingPrice
              ? `From ₹${gig.startingPrice}`
              : gig.budget
              ? `₹${gig.budget}`
              : 'Get Quote'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Empty state ─────────────────────────────────────────────────
function EmptyServicesState({ onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
        <FiAlertCircle size={28} className="text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No Services Yet</h3>
      <p className="text-slate-400 text-sm max-w-sm mb-6">
        Services will appear here once freelancers start listing their gigs on SkillSphere.
      </p>
      <button
        onClick={onRetry}
        className="btn-secondary flex items-center gap-2 text-sm"
      >
        <FiRefreshCw size={14} />
        Retry
      </button>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────
function PopularServices() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadGigs = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await searchGigs({ limit: 6, sort: 'popular' })
      // Handle different response shapes from the backend
      const list = Array.isArray(data) ? data : data?.gigs || data?.data || []
      setGigs(list.slice(0, 6))
    } catch {
      // API not available yet — show empty state (no fake data)
      setGigs([])
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadGigs() }, [])

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Popular services">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3"
          >
            Top Picks
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Popular Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Browse the most in-demand services from top-rated freelancers
          </motion.p>
        </div>

        {/* ── Services Grid ─────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            // Skeleton loading cards
            Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))
          ) : gigs.length > 0 ? (
            // Real API data
            gigs.map((gig) => (
              <ServiceCard key={gig._id || gig.id} gig={gig} />
            ))
          ) : (
            // Empty / error state
            <EmptyServicesState onRetry={loadGigs} />
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default PopularServices
