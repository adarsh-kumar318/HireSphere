/* ============================================================
   Why SkillSphere Section
   5 feature cards explaining platform differentiators
   ============================================================ */
import { motion } from 'framer-motion'
import {
  FiZap, FiShield, FiCreditCard, FiClock, FiMessageSquare,
} from 'react-icons/fi'
import { PLATFORM_FEATURES } from '../../utils/constants'

const ICON_MAP = { FiZap, FiShield, FiCreditCard, FiClock, FiMessageSquare }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function WhySkillSphere() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1628]" aria-label="Why SkillSphere">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            SkillSphere combines cutting-edge technology with a human-first approach to freelancing
          </motion.p>
        </div>

        {/* ── Feature Cards Grid ────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PLATFORM_FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || FiZap
            // Last card in a 5-item grid gets centered on last row
            const isLast = i === PLATFORM_FEATURES.length - 1
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`group bg-[#1E293B] border ${feature.border} rounded-2xl p-6 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 ${
                  isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} border ${feature.border} flex items-center justify-center mb-5`}
                >
                  <Icon size={22} className={feature.text} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhySkillSphere
