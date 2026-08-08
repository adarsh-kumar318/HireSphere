/* ============================================================
   Featured Freelancers Section
   Real API data from /marketplace/freelancers
   Shows loading skeletons and elegant empty state if no data
   ============================================================ */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiCheckCircle, FiMapPin, FiRefreshCw, FiUsers } from 'react-icons/fi'
import { searchFreelancers } from '../../services/marketplaceService'

// ── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// ── Skeleton card ───────────────────────────────────────────────
function FreelancerSkeleton() {
  return (
    <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-6">
      <div className="mb-4 flex items-start gap-4">
        <div className="skeleton h-14 w-14 shrink-0 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => <div key={i} className="skeleton h-5 w-16 rounded-full" />)}
      </div>
      <div className="skeleton h-8 w-full rounded-xl" />
    </div>
  )
}

// ── Individual freelancer card ──────────────────────────────────
function FreelancerCard({ freelancer }) {
  const initial = (freelancer.name || freelancer.businessName || 'F').charAt(0).toUpperCase()
  const skills = freelancer.skills || freelancer.expertise || []
  const location = freelancer.location || freelancer.city || ''
  const rating = freelancer.rating || freelancer.reputationScore || null
  const hourlyRate = freelancer.hourlyRate || freelancer.rate || null

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="group rounded-2xl border border-[#334155] bg-[#1E293B] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-black/20"
    >
      {/* Header: Avatar + name + verified */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="bg-linear-to-br flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl from-indigo-500 to-cyan-500 text-xl font-bold text-white">
            {freelancer.avatar ? (
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              initial
            )}
          </div>

          {/* Name & title */}
          <div>
            <h3 className="text-sm font-semibold leading-tight text-white">
              {freelancer.name || freelancer.businessName || 'Freelancer'}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
              {freelancer.title || freelancer.profession || 'Independent Freelancer'}
            </p>
            {location && (
              <div className="mt-1 flex items-center gap-1">
                <FiMapPin size={11} className="text-slate-500" />
                <span className="text-xs text-slate-500">{location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Verified badge */}
        {freelancer.verified && (
          <div className="flex shrink-0 items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1">
            <FiCheckCircle size={12} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Verified</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="border-indigo-500/15 rounded-full border bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="rounded-full bg-[#334155]/50 px-2.5 py-1 text-xs text-slate-400">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer: rating + rate */}
      <div className="flex items-center justify-between border-t border-[#334155] pt-4">
        {rating !== null && (
          <div className="flex items-center gap-1">
            <FiStar size={12} className="fill-current text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">{rating}</span>
          </div>
        )}
        {hourlyRate && (
          <span className="text-sm font-bold text-white">
            {typeof hourlyRate === 'number' ? `₹${hourlyRate}/hr` : hourlyRate}
          </span>
        )}
        <button className="text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300">
          View Profile →
        </button>
      </div>
    </motion.div>
  )
}

// ── Empty state ─────────────────────────────────────────────────
function EmptyFreelancersState({ onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10">
        <FiUsers size={28} className="text-indigo-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">No Freelancers Listed Yet</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-400">
        Featured freelancers will appear here as professionals join SkillSphere.
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
function FeaturedFreelancers() {
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)

  const loadFreelancers = async () => {
    setLoading(true)
    try {
      const data = await searchFreelancers({ limit: 6, sort: 'featured' })
      const list = Array.isArray(data) ? data : data?.freelancers || data?.data || []
      setFreelancers(list.slice(0, 6))
    } catch {
      // API unavailable — show empty state, no fake data
      setFreelancers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchFreelancers = async () => {
      await loadFreelancers()
    }

    fetchFreelancers()
  }, [])

  return (
    <section className="bg-[#0D1628] px-4 py-20 sm:px-6 lg:px-8" aria-label="Featured freelancers">
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400"
          >
            Top Talent
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          >
            Featured Freelancers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-xl text-slate-400"
          >
            Hand-picked, verified professionals ready to take on your next project
          </motion.p>
        </div>

        {/* ── Grid ─────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <FreelancerSkeleton key={i} />)
          ) : freelancers.length > 0 ? (
            freelancers.map((f) => <FreelancerCard key={f._id || f.id} freelancer={f} />)
          ) : (
            <EmptyFreelancersState onRetry={loadFreelancers} />
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedFreelancers
