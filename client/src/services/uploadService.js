import api from './api'

export const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await api.put('/upload/avatar', formData)

  return response.data
}

export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await api.put('/upload/resume', formData)

  return response.data
}