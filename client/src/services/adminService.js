import api from './api'

export const getAdminDashboard = async () => {
  const { data } = await api.get('/admin/dashboard')
  return data
}

export const getStudents = async (params = {}) => {
  const { data } = await api.get('/admin/students', { params })
  return data
}

export const getCompanies = async (params = {}) => {
  const { data } = await api.get('/admin/companies', { params })
  return data
}

export const getJobs = async (params = {}) => {
  const { data } = await api.get('/admin/jobs', { params })
  return data
}

export const getApplications = async (params = {}) => {
  const { data } = await api.get('/admin/applications', { params })
  return data
}

export const getPlacementStats = async () => {
  const { data } = await api.get('/admin/statistics')
  return data
}

export const getAdminNotifications = async () => {
  const { data } = await api.get('/admin/notifications')
  return data
}

export const updateAdminSettings = async (payload) => {
  const { data } = await api.put('/admin/settings', payload)
  return data
}

export const getPlatformAnalytics = async () => {
  const { data } = await api.get('/admin/analytics')
  return data
}

export const getUsers = async (params = {}) => {
  const { data } = await api.get('/admin/users', { params })
  return data
}

export const verifyFreelancer = async ({ freelancerId, status }) => {
  const { data } = await api.patch(`/admin/freelancers/${freelancerId}/verification`, { status })
  return data
}

export const approveGig = async ({ gigId, status }) => {
  const { data } = await api.patch(`/admin/gigs/${gigId}/approval`, { status })
  return data
}

export const getPaymentMonitoring = async (params = {}) => {
  const { data } = await api.get('/admin/payments', { params })
  return data
}

export const getFraudSignals = async () => {
  const { data } = await api.get('/admin/fraud-signals')
  return data
}

export const resolveDispute = async ({ disputeId, resolution }) => {
  const { data } = await api.post(`/admin/disputes/${disputeId}/resolve`, { resolution })
  return data
}
