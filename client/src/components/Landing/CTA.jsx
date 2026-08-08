/* ============================================================
   Call to Action Section
   Dark premium section with join / explore buttons
   ============================================================ */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiZap } from 'react-icons/fi'

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Call to action">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/80 via-[#1E293B] to-cyan-900/40 border border-indigo-500/20 p-8 sm:p-12 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-1/3 w-48 h-24 bg-cyan-500/15 blur-3xl rounded-full" />
          </div>

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6">
              <FiZap size={14} className="text-indigo-400" />
              Start for free today
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Start Your{' '}
              <span className="gradient-text">Next Project?</span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of clients and freelancers who are building great things on SkillSphere.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-base px-8 py-3.5 gap-2"
              >
                Join SkillSphere
                <FiArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-base px-8 py-3.5"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust signals */}
            <p className="text-xs text-slate-600 mt-8">
              No credit card required &nbsp;·&nbsp; Free to join &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
