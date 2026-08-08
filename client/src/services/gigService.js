import api from './api'

// Client Gig endpoints
export const getGigsForClient = async () => {
  const response = await api.get('/client/gigs')
  return response.data
}

export const getProposalsForClient = async () => {
  const response = await api.get('/client/proposals')
  return response.data
}

export const updateProposalStatus = async (proposalId, status) => {
  const response = await api.patch(`/proposals/${proposalId}/status`, { status })
  return response.data
}

// Freelancer Gig endpoints
export const getProposalsForFreelancer = async () => {
  const response = await api.get('/freelancer/proposals')
  return response.data
}

export const applyForGig = async (gigId, proposalData) => {
  const response = await api.post(`/gigs/${gigId}/apply`, proposalData)
  return response.data
}
