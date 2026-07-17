import api from './api'

export const getClientDashboard = async () => {
  const { data } = await api.get('/clients/dashboard')
  return data
}

export const createGig = async (payload) => {
  const { data } = await api.post('/clients/gigs', payload)
  return data
}

export const getClientGigs = async (params = {}) => {
  const { data } = await api.get('/clients/gigs', { params })
  return data
}

export const getFreelancerRecommendations = async (gigId) => {
  const { data } = await api.get(`/clients/gigs/${gigId}/recommendations`)
  return data
}

export const inviteFreelancer = async ({ gigId, freelancerId }) => {
  const { data } = await api.post(`/clients/gigs/${gigId}/invites`, { freelancerId })
  return data
}

export const respondToProposal = async ({ proposalId, status }) => {
  const { data } = await api.patch(`/clients/proposals/${proposalId}`, { status })
  return data
}
