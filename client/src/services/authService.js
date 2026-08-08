import api from './api'

export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export const registerUser = async (payload) => {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const forgotPassword = async (email) => {
  const { data } = await api.post('/auth/forgot-password', { email })
  return data
}

export const resetPassword = async ({ token, password }) => {
  const { data } = await api.post(`/auth/reset-password/${token || ''}`, { password })
  return data
}

export const getCurrentUser = async () => {
  const { data } = await api.get('/user/profile')
  return { user: data.user, token: localStorage.getItem('skillsphere_token') }
}

export const verifyEmail = async (token) => {
  const { data } = await api.post('/auth/verify-email', { token })
  return data
}

export const verifyTwoFactorCode = async ({ code }) => {
  const { data } = await api.post('/auth/2fa/verify', { code })
  return data
}

export const googleLogin = async ({ credential, role }) => {
  const { data } = await api.post('/auth/google', {
    credential,
    token: credential,
    role,
  })
  return data
}
