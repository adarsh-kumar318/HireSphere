import axios from 'axios'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillsphere_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('skillsphere_token')
      localStorage.removeItem('skillsphere_user')
    }

    return Promise.reject(error)
  },
)

export default api