/* Testimonials — real API data or empty state (no fake reviews) */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiMessageCircle, FiRefreshCw } from 'react-icons/fi'
import { getTestimonials } from '../../services/marketplaceService'

function TestimonialSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-[#334155] bg-[#1E293B] p-6">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  const stars = testimonial.rating || 5
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-[#334155] bg-[#1E293B] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            className={i < stars ? 'fill-current text-amber-400' : 'text-slate-600'}
          />
        ))}
      </div>
      <p className="mb-5 text-sm italic leading-relaxed text-slate-300">
        &ldquo;{testimonial.review || testimonial.comment || testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 border-t border-[#334155] pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
          {(testimonial.name || testimonial.author || 'U').charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name || testimonial.author || 'Anonymous'}</p>
          <p className="text-xs text-slate-500">{testimonial.role || testimonial.title || 'SkillSphere User'}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadTestimonials = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await getTestimonials()
      const list = Array.isArray(data) ? data : data?.testimonials || []
      setTestimonials(list)
    } catch {
      setTestimonials([])
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  return (
    <section className="bg-[#0D1628] px-4 py-20 sm:px-6 lg:px-8" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400"
          >
            Social Proof
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          >
            What Our Users Say
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <TestimonialSkeleton key={i} />)
          ) : testimonials.length > 0 ? (
            testimonials.slice(0, 6).map((t, i) => (
              <TestimonialCard key={t._id || t.id || i} testimonial={t} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10">
                <FiMessageCircle size={28} className="text-indigo-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">No testimonials available yet.</h3>
              <p className="mb-6 max-w-sm text-sm text-slate-400">
                Reviews from completed projects will appear here once clients share their experience.
              </p>
              {error && (
                <button type="button" onClick={loadTestimonials} className="btn-secondary flex items-center gap-2 text-sm">
                  <FiRefreshCw size={14} /> Retry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
