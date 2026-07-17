import api from './api'

export const createEscrowPayment = async (payload) => {
  const { data } = await api.post('/payments/escrow', payload)
  return data
}

export const releaseMilestonePayment = async (paymentId) => {
  const { data } = await api.post(`/payments/${paymentId}/release`)
  return data
}

export const requestRefund = async ({ paymentId, reason }) => {
  const { data } = await api.post(`/payments/${paymentId}/refunds`, { reason })
  return data
}

export const getTransactionHistory = async (params = {}) => {
  const { data } = await api.get('/payments/transactions', { params })
  return data
}
