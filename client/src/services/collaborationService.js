import api from './api'

export const getMessages = async (projectId) => {
  const { data } = await api.get(`/collaboration/projects/${projectId}/messages`)
  return data
}

export const sendMessage = async ({ projectId, payload }) => {
  const { data } = await api.post(`/collaboration/projects/${projectId}/messages`, payload)
  return data
}

export const uploadCollaborationFile = async ({ projectId, file }) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post(`/collaboration/projects/${projectId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const updateMilestoneProgress = async ({ milestoneId, progress }) => {
  const { data } = await api.patch(`/collaboration/milestones/${milestoneId}`, { progress })
  return data
}
