import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { getCurrentUser, googleLogin, loginUser, registerUser } from '../services/authService'
import { AuthContext } from './AuthContextValue'

const readStoredUser = () => {
  const storedUser = localStorage.getItem('skillsphere_user')

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem('skillsphere_user')
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [token, setToken] = useState(() => localStorage.getItem('skillsphere_token'))
  const [initializing, setInitializing] = useState(Boolean(token))

  const persistSession = useCallback((payload) => {
    const nextUser = payload.user || payload
    const nextToken = payload.token || payload.accessToken

    if (nextToken) {
      localStorage.setItem('skillsphere_token', nextToken)
      setToken(nextToken)
    }

    localStorage.setItem('skillsphere_user', JSON.stringify(nextUser))
    setUser(nextUser)
    return nextUser
  }, [])

  const login = useCallback(
    async (credentials) => {
      const data = await loginUser(credentials)
      const nextUser = persistSession(data)
      toast.success(`Welcome back, ${nextUser.name || 'user'}`)
      return nextUser
    },
    [persistSession],
  )

  const register = useCallback(
    async (payload) => {
      const data = await registerUser(payload)
      const nextUser = persistSession(data)
      toast.success('Registration successful')
      return nextUser
    },
    [persistSession],
  )

  const loginWithGoogle = useCallback(
    async ({ credential, role }) => {
      const data = await googleLogin({ credential, role })
      const nextUser = persistSession(data)
      toast.success(`Welcome, ${nextUser.name || 'Google user'}`)
      return nextUser
    },
    [persistSession],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('skillsphere_token')
    localStorage.removeItem('skillsphere_user')
    setToken(null)
    setUser(null)
    toast.info('You have been logged out')
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    let isMounted = true

    getCurrentUser()
      .then((data) => {
        if (isMounted) {
          persistSession(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          localStorage.removeItem('skillsphere_token')
          localStorage.removeItem('skillsphere_user')
          setToken(null)
          setUser(null)
        }
      })
      .finally(() => {
        if (isMounted) {
          setInitializing(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [persistSession, token])

  const value = useMemo(
    () => ({
      user,
      token,
      initializing,
      isAuthenticated: Boolean(token && user),
      login,
      loginWithGoogle,
      register,
      logout,
    }),
    [initializing, login, loginWithGoogle, logout, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
