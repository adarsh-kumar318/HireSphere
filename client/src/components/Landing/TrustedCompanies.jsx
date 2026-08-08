/* ============================================================
   Trusted Companies Section
   Animated grayscale logo strip with hover color transition
   ============================================================ */
import { motion } from 'framer-motion'

// Company placeholder data — realistic company name placeholders
const COMPANIES = [
  { id: 1, name: 'Accenture', initial: 'A' },
  { id: 2, name: 'Infosys', initial: 'I' },
  { id: 3, name: 'TechCorp', initial: 'T' },
  { id: 4, name: 'Wipro', initial: 'W' },
  { id: 5, name: 'Deloitte', initial: 'D' },
  { id: 6, name: 'Capgemini', initial: 'C' },
  { id: 7, name: 'Cognizant', initial: 'Cg' },
  { id: 8, name: 'HCL', initial: 'H' },
]

function TrustedCompanies() {
  return (
    <section className="py-14 border-y border-[#334155]/40" aria-label="Trusted by companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p className="text-center text-sm text-slate-500 font-medium tracking-widest uppercase mb-8">
          Trusted by teams at top companies
        </p>

        {/* Logo strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {COMPANIES.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.05 }}
              className="group flex items-center gap-2.5 cursor-default"
            >
              {/* Logo placeholder circle */}
              <div className="w-9 h-9 rounded-lg bg-[#334155]/60 border border-[#334155] flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:border-indigo-500/40 transition-all duration-300">
                <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-300 transition-colors">
                  {company.initial}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedCompanies
