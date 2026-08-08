/* ============================================================
   Landing Page (Homepage)
   Assembles all 13 sections in order. Each section is its own
   focused component for maintainability and performance.
   ============================================================ */
import { useEffect } from 'react'
import LandingNavbar      from '../../components/Landing/Navbar'
import Hero               from '../../components/Landing/Hero'
import TrustedCompanies   from '../../components/Landing/TrustedCompanies'
import PopularCategories  from '../../components/Landing/PopularCategories'
import PopularServices    from '../../components/Landing/PopularServices'
import WhySkillSphere     from '../../components/Landing/WhySkillSphere'
import HowItWorks         from '../../components/Landing/HowItWorks'
import FeaturedFreelancers from '../../components/Landing/FeaturedFreelancers'
import Statistics         from '../../components/Landing/Statistics'
import Testimonials       from '../../components/Landing/Testimonials'
import FAQ                from '../../components/Landing/FAQ'
import CTA                from '../../components/Landing/CTA'
import Footer             from '../../components/Landing/Footer'

function LandingPage() {
  // Set page title and scroll to top on mount
  useEffect(() => {
    document.title = 'SkillSphere — Connect. Collaborate. Create.'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="min-h-screen bg-[#0F172A] overflow-x-hidden" role="main">
      {/* 1. Navbar — sticky, blur-on-scroll, auth-aware */}
      <LandingNavbar />

      {/* 2. Hero — full-viewport, search bar, animated cards */}
      <Hero />

      {/* 3. Trusted Companies — animated logo strip */}
      <TrustedCompanies />

      {/* 4. Popular Categories — icon grid */}
      <PopularCategories />

      {/* 5. Popular Services — real API data with loading/empty states */}
      <PopularServices />

      {/* 6. Why SkillSphere — 5 feature cards */}
      <WhySkillSphere />

      {/* 7. How It Works — 4-step timeline */}
      <HowItWorks />

      {/* 8. Featured Freelancers — real API data */}
      <FeaturedFreelancers />

      {/* 9. Platform Statistics — animated counters */}
      <Statistics />

      {/* 10. Testimonials — real data or empty state */}
      <Testimonials />

      {/* 11. FAQ — animated accordion */}
      <FAQ />

      {/* 12. CTA — dark section, join / explore buttons */}
      <CTA />

      {/* 13. Footer — full company / services / support links */}
      <Footer />
    </main>
  )
}

export default LandingPage
