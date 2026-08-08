/* ============================================================
   Popular Categories Section
   Icon grid with category cards, hover animation, color themes
   ============================================================ */
import { motion } from 'framer-motion'
import {
  FiCode, FiPenTool, FiTrendingUp, FiFileText,
  FiBarChart2, FiVideo, FiBriefcase, FiZap,
} from 'react-icons/fi'
import { CATEGORIES } from '../../utils/constants'

// Icon map — maps icon string names to actual React Icon components
const ICON_MAP = {
  FiCode,
  FiPenTool,
  FiTrendingUp,
  FiFileText,
  FiBarChart2,
  FiVideo,
  FiBriefcase,
  FiZap,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function PopularCategories() {
  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Popular categories">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3"
          >
            Explore by Category
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Browse Popular Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Find expert freelancers across every industry and skill set
          </motion.p>
        </div>

        {/* ── Category Grid ─────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || FiZap
            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative bg-[#1E293B] border ${cat.border} rounded-2xl p-5 cursor-pointer hover:shadow-lg hover:shadow-black/20 transition-all duration-300`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} border ${cat.border} flex items-center justify-center mb-4`}
                >
                  <Icon size={22} className={cat.text} />
                </div>

                {/* Text */}
                <h3 className={`font-semibold text-white mb-1.5 text-sm group-hover:${cat.text} transition-colors`}>
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default PopularCategories
