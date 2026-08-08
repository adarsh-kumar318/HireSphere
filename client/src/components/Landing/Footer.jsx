/* ============================================================
   Landing Page Footer
   Full professional footer with company / services / support
   links, social icons, and copyright
   ============================================================ */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiZap,
} from 'react-icons/fi'
import { FOOTER_LINKS } from '../../utils/constants'
import logo from '../../assets/logo.png'

// Social icon links
const SOCIAL_LINKS = [
  { icon: FiGithub,   href: 'https://github.com',   label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com',  label: 'LinkedIn' },
  { icon: FiInstagram,href: 'https://instagram.com', label: 'Instagram' },
  { icon: FiTwitter,  href: 'https://twitter.com',   label: 'X (Twitter)' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0A1120] border-t border-[#334155]/40" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Footer Grid ─────────────────────────────────── */}
        <div className="py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit" aria-label="SkillSphere">
              <img src={logo} alt="SkillSphere Logo" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold text-white tracking-tight">
                Skill<span className="gradient-text">Sphere</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Connect. Collaborate. Create.
              <br />
              The premium marketplace for freelance professionals.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Services</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Support</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────── */}
        <div className="py-6 border-t border-[#334155]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {currentYear} SkillSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">·</span>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <span className="text-slate-700">·</span>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
