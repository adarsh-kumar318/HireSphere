import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiRefreshCw } from 'react-icons/fi'
import { getPlatformStats } from '../../services/marketplaceService'

function StatSkeleton() {
  return (
    <div className="text-center space-y-3">
      <div className="skeleton mx-auto h-10 w-24 rounded-lg" />
      <div className="skeleton mx-auto h-4 w-32 rounded" />
    </div>
  )
}

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start || target == null) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration, start])

  return count
}

function StatItem({ stat }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCounter(stat.value, 2000, isInView && stat.value != null)

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-2 text-4xl font-bold text-white sm:text-5xl">
          {stat.prefix}
          {stat.value != null ? count.toLocaleString() : '—'}
          {stat.suffix && <span className="gradient-text">{stat.suffix}</span>}
        </p>
        <p className="text-sm font-medium text-slate-400">{stat.label}</p>
      </motion.div>
    </div>
  )
}

/* Platform statistics — loaded from /marketplace/stats */
function Statistics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadStats = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await getPlatformStats()
      setStats(data.stats || data)
    } catch {
      setStats(null)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  const statItems = stats
    ? [
        { id: 'users', label: 'Registered Users', value: stats.totalUsers, suffix: '' },
        { id: 'freelancers', label: 'Verified Freelancers', value: stats.totalFreelancers, suffix: '' },
        { id: 'jobs', label: 'Projects Posted', value: stats.totalJobs, suffix: '' },
        {
          id: 'success',
          label: 'Job Success Rate',
          value: stats.jobSuccessRate,
          suffix: stats.jobSuccessRate != null ? '%' : '',
        },
      ]
    : []

  return (
    <section className="bg-[#0D1628] px-4 py-20 sm:px-6 lg:px-8" aria-label="Platform statistics">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          >
            Trusted by Professionals Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-lg text-slate-400"
          >
            Real-time platform metrics from the SkillSphere marketplace
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatSkeleton key={i} />
            ))}
          </div>
        ) : error || !stats ? (
          <div className="flex flex-col items-center py-8 text-center">
            <p className="mb-4 text-slate-400">Unable to load platform statistics.</p>
            <button type="button" onClick={loadStats} className="btn-secondary flex items-center gap-2 text-sm">
              <FiRefreshCw size={14} /> Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {statItems.map((stat) => (
              <StatItem key={stat.id} stat={stat} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Statistics
