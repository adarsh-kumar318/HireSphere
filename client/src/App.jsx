import { Navigate, Route, Routes } from 'react-router-dom'
import ToastNotifications from './components/Common/ToastNotifications'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import VerifyEmail from './pages/Auth/VerifyEmail'
import TwoFactorAuth from './pages/Auth/TwoFactorAuth'
import ClientDashboard from './pages/Client/ClientDashboard'
import PostGig from './pages/Client/PostGig'
import ClientProjects from './pages/Client/ClientProjects'
import FindFreelancers from './pages/Client/FindFreelancers'
import ClientProposals from './pages/Client/ClientProposals'
import ClientPayments from './pages/Client/ClientPayments'
import ClientCollaboration from './pages/Client/ClientCollaboration'
import ClientNotifications from './pages/Client/ClientNotifications'
import FreelancerDashboard from './pages/Freelancer/FreelancerDashboard'
import FreelancerProfile from './pages/Freelancer/FreelancerProfile'
import GigMarketplace from './pages/Freelancer/GigMarketplace'
import FreelancerProposals from './pages/Freelancer/FreelancerProposals'
import AvailabilityScheduler from './pages/Freelancer/AvailabilityScheduler'
import ReputationReviews from './pages/Freelancer/ReputationReviews'
import FreelancerAnalytics from './pages/Freelancer/FreelancerAnalytics'
import FreelancerCollaboration from './pages/Freelancer/FreelancerCollaboration'
import FreelancerNotifications from './pages/Freelancer/FreelancerNotifications'
import AdminDashboard from './pages/Admin/AdminDashboard'
import UserManagement from './pages/Admin/UserManagement'
import FreelancerVerification from './pages/Admin/FreelancerVerification'
import GigApprovals from './pages/Admin/GigApprovals'
import PaymentMonitoring from './pages/Admin/PaymentMonitoring'
import FraudDetection from './pages/Admin/FraudDetection'
import DisputeResolution from './pages/Admin/DisputeResolution'
import AdminAnalytics from './pages/Admin/AdminAnalytics'
import AdminSettings from './pages/Admin/AdminSettings'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <ToastNotifications />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token?" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-2fa" element={<TwoFactorAuth />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route element={<DashboardLayout role="client" />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/post-gig" element={<PostGig />} />
            <Route path="/client/projects" element={<ClientProjects />} />
            <Route path="/client/find-freelancers" element={<FindFreelancers />} />
            <Route path="/client/proposals" element={<ClientProposals />} />
            <Route path="/client/payments" element={<ClientPayments />} />
            <Route path="/client/collaboration" element={<ClientCollaboration />} />
            <Route path="/client/notifications" element={<ClientNotifications />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['freelancer']} />}>
          <Route element={<DashboardLayout role="freelancer" />}>
            <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
            <Route path="/freelancer/profile" element={<FreelancerProfile />} />
            <Route path="/freelancer/marketplace" element={<GigMarketplace />} />
            <Route path="/freelancer/proposals" element={<FreelancerProposals />} />
            <Route path="/freelancer/availability" element={<AvailabilityScheduler />} />
            <Route path="/freelancer/reputation" element={<ReputationReviews />} />
            <Route path="/freelancer/analytics" element={<FreelancerAnalytics />} />
            <Route path="/freelancer/collaboration" element={<FreelancerCollaboration />} />
            <Route path="/freelancer/notifications" element={<FreelancerNotifications />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/verification" element={<FreelancerVerification />} />
            <Route path="/admin/gigs" element={<GigApprovals />} />
            <Route path="/admin/payments" element={<PaymentMonitoring />} />
            <Route path="/admin/fraud" element={<FraudDetection />} />
            <Route path="/admin/disputes" element={<DisputeResolution />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
