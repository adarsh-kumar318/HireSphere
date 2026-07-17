import api from './api'

export const getFreelancerDashboard = async () => {
  const { data } = await api.get('/freelancers/dashboard')
  return data
}

export const getFreelancerProfile = async () => {
  const { data } = await api.get('/freelancers/profile')
  return data
}

export const updateFreelancerProfile = async (payload) => {
  const { data } = await api.put('/freelancers/profile', payload)
  return data
}

export const uploadFreelancerResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  const { data } = await api.post('/freelancers/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const submitProposal = async ({ gigId, payload }) => {
  const { data } = await api.post(`/freelancers/gigs/${gigId}/proposals`, payload)
  return data
}

export const updateAvailability = async (payload) => {
  const { data } = await api.put('/freelancers/availability', payload)
  return data
}

export const getFreelancerAnalytics = async () => {
  const { data } = await api.get('/freelancers/analytics')
  return data
}
