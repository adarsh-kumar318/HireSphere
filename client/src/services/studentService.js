import api from './api'

export const getStudentDashboard = async () => {
  const { data } = await api.get('/student/dashboard')
  return data
}

export const getStudentProfile = async () => {
  const { data } = await api.get('/student/profile')
  return data
}

export const updateStudentProfile = async (payload) => {
  const { data } = await api.put('/student/profile', payload)
  return data
}

export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  const { data } = await api.post('/student/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const saveSkills = async (skills) => {
  const { data } = await api.put('/student/skills', { skills })
  return data
}

export const getAvailableJobs = async (params = {}) => {
  const { data } = await api.get('/student/jobs', { params })
  return data
}

export const applyToJob = async (jobId) => {
  const { data } = await api.post(`/student/jobs/${jobId}/apply`)
  return data
}

export const getAppliedJobs = async () => {
  const { data } = await api.get('/student/applied-jobs')
  return data
}

export const getStudentNotifications = async () => {
  const { data } = await api.get('/student/notifications')
  return data
}
