import api from './api'

export const searchGigs = async (params = {}) => {
  const { data } = await api.get('/marketplace/gigs', { params })
  return data
}

export const searchFreelancers = async (params = {}) => {
  const { data } = await api.get('/marketplace/freelancers', { params })
  return data
}

export const getTrendingSkills = async () => {
  const { data } = await api.get('/marketplace/trending-skills')
  return data
}

export const getAiMatches = async (payload) => {
  const { data } = await api.post('/marketplace/ai-matches', payload)
  return data
}
