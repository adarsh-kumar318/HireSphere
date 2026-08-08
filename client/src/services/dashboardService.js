import api from './api'

export const getClientDashboard = async () => {
  const { data } = await api.get('/dashboard/client')
  return data
}

export const getFreelancerDashboard = async () => {
  const { data } = await api.get('/dashboard/freelancer')
  return data
}

export const getAdminDashboard = async () => {
  const { data } = await api.get('/dashboard/admin')
  return data
}
