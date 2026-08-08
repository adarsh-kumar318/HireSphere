/* ============================================================
   FAQ Section
   Animated accordion with smooth expand/collapse transitions
   ============================================================ */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { FAQ_ITEMS } from '../../utils/constants'

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-[#334155] rounded-2xl overflow-hidden">
      {/* Question — toggle button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-[#1E293B] hover:bg-[#263548] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white text-sm sm:text-base">{item.question}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </span>
      </button>

      {/* Answer — animated collapse */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 bg-[#1A2537] border-t border-[#334155]">
              <p className="pt-4 text-slate-400 text-sm leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3"
          >
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400"
          >
            Everything you need to know about SkillSphere
          </motion.p>
        </div>

        {/* ── Accordion ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
