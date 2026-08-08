import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import GigDetails from '../pages/GigDetails'
import Messages from '../pages/Messages'
import NotFound from '../pages/NotFound'

import ClientDashboard from '../pages/Client/ClientDashboard'
import PostGig from '../pages/Client/PostGig'
import MyGigs from '../pages/Client/MyGigs'
import Proposals from '../pages/Client/Proposals'

import FreelancerDashboard from '../pages/Freelancer/FreelancerDashboard'
import BrowseGigs from '../pages/Freelancer/BrowseGigs'
import MyProposals from '../pages/Freelancer/MyProposals'
import Profile from '../pages/Freelancer/Profile'
import Portfolio from '../pages/Freelancer/Portfolio'

import AdminDashboard from '../pages/Admin/AdminDashboard'
import ManageUsers from '../pages/Admin/ManageUsers'
import ManageGigs from '../pages/Admin/ManageGigs'
import Analytics from '../pages/Admin/Analytics'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
        <Route path="/messages" element={<Messages />} />
      </Route>

      <Route element={<DashboardLayout role="client" />}>
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/post-gig" element={<PostGig />} />
        <Route path="/client/my-gigs" element={<MyGigs />} />
        <Route path="/client/proposals" element={<Proposals />} />
      </Route>

      <Route element={<DashboardLayout role="freelancer" />}>
        <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
        <Route path="/freelancer/browse-gigs" element={<BrowseGigs />} />
        <Route path="/freelancer/my-proposals" element={<MyProposals />} />
        <Route path="/freelancer/profile" element={<Profile />} />
        <Route path="/freelancer/portfolio" element={<Portfolio />} />
      </Route>

      <Route element={<DashboardLayout role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/gigs" element={<ManageGigs />} />
        <Route path="/admin/analytics" element={<Analytics />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
