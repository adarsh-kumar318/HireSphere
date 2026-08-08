/* ============================================================
   Landing Layout
   Minimal wrapper for all public-facing (non-dashboard) pages.
   Renders children directly without sidebar or dashboard chrome.
   ============================================================ */
import { Outlet } from 'react-router-dom'

function LandingLayout() {
  return (
    // Full-height flex column — children fill the space
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-[#F8FAFC]">
      <Outlet />
    </div>
  )
}

export default LandingLayout
