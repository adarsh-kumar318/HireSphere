import api from './api'

export const getCompanyDashboard = async () => {
  const { data } = await api.get('/company/dashboard')
  return data
}

export const createJob = async (payload) => {
  const { data } = await api.post('/company/jobs', payload)
  return data
}

export const getCompanyJobs = async (params = {}) => {
  const { data } = await api.get('/company/jobs', { params })
  return data
}

export const getApplicants = async (params = {}) => {
  const { data } = await api.get('/company/applicants', { params })
  return data
}

export const getCompanyProfile = async () => {
  const { data } = await api.get('/company/profile')
  return data
}

export const updateCompanyProfile = async (payload) => {
  const { data } = await api.put('/company/profile', payload)
  return data
}
