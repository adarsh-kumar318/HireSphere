import { Link } from 'react-router-dom'
import { FiZap, FiTwitter, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

const footerLinks = {
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Services: [
    { label: 'Web Development', href: '#' },
    { label: 'AI & Automation', href: '#' },
    { label: 'UI/UX Design', href: '#' },
    { label: 'Digital Marketing', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'FAQ', href: '#faq' },
  ],
}

const socials = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
]

function LandingFooter() {
  return (
    <footer className="bg-[#0D1B2E] border-t border-[#334155]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <FiZap size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">SkillSphere</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The intelligent local freelance ecosystem. Connecting talented professionals with clients who need them most.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#334155] text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all no-underline"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">&copy; 2026 SkillSphere. All rights reserved.</p>
          <p className="text-xs text-slate-600">Made with ❤️ using MERN Stack</p>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
