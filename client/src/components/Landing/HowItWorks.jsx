/* ============================================================
   How It Works Section
   4-step professional timeline with icons and animations
   ============================================================ */
import { motion } from 'framer-motion'
import {
  FiUserPlus, FiSearch, FiCheckCircle,
} from 'react-icons/fi'
import { HOW_IT_WORKS_STEPS } from '../../utils/constants'

const ICON_MAP = {
  FiUserPlus,
  FiSearch,
  FiHandshake: FiCheckCircle, // fallback
  FiCheckCircle,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="How it works">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            How SkillSphere Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Get started in minutes and hire your perfect freelancer today
          </motion.p>
        </div>

        {/* ── Steps Grid ────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent"
            aria-hidden="true"
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] || FiCheckCircle
            return (
              <motion.div
                key={step.step}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number circle */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 border border-indigo-500/30 flex flex-col items-center justify-center shadow-lg shadow-indigo-900/40">
                    <Icon size={24} className="text-white mb-0.5" />
                  </div>
                  {/* Step badge */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0F172A] border border-[#334155] flex items-center justify-center text-xs font-bold text-indigo-400">
                    {step.step}
                  </span>
                </div>

                {/* Arrow between steps (mobile only) */}
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="lg:hidden text-slate-600 text-2xl mb-3 rotate-90 sm:rotate-0">
                    →
                  </div>
                )}

                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
