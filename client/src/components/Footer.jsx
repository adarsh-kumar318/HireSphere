import { Link } from 'react-router-dom'
import { FiBriefcase, FiMail, FiMapPin } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-[#334155] text-slate-300 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="flex items-center gap-2 text-white font-bold text-lg">
              <FiBriefcase className="text-cyan-400" /> SkillSphere
            </h5>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Hyperlocal freelance marketplace connecting skilled professionals with nearby clients.
            </p>
          </div>
          <div>
            <h6 className="text-cyan-400 font-semibold mb-3">Platform</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white transition-colors">
                  Become a Freelancer
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                  Post a Gig
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-cyan-400 font-semibold mb-3">Company</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Careers
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-cyan-400 font-semibold mb-3">Contact</h6>
            <p className="text-sm text-slate-400 mb-2 flex items-center gap-2">
              <FiMail className="flex-shrink-0" /> hello@skillsphere.in
            </p>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <FiMapPin className="flex-shrink-0" /> Bengaluru, India
            </p>
          </div>
        </div>
        <hr className="border-[#334155] my-6" />
        <p className="text-center text-slate-500 text-sm mb-0">
          &copy; {new Date().getFullYear()} SkillSphere. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
