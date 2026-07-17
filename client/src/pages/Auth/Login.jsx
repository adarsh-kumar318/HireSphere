import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import { useAuth } from '../../hooks/useAuth'
import { USER_ROLES } from '../../utils/constants'
import { isEmail, required } from '../../utils/validators'

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'freelancer'
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { login, loginWithGoogle } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const validate = () => {
    const nextErrors = {}

    if (!isEmail(form.email))
      nextErrors.email = 'Enter a valid email address'

    if (!required(form.password))
      nextErrors.password = 'Password is required'

    if (!required(form.role))
      nextErrors.role = 'Choose a role'

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    try {
      setLoading(true)

      const user = await login(form)

      const fallback = `/${user.role || form.role}/dashboard`

      navigate(location.state?.from?.pathname || fallback, {
        replace: true
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error('Google did not return a credential')
      return
    }

    try {
      setGoogleLoading(true)
      const user = await loginWithGoogle({
        credential: credentialResponse.credential,
        role: form.role,
      })

      navigate(location.state?.from?.pathname || `/${user.role || form.role}/dashboard`, {
        replace: true,
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={handleChange}
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={handleChange}
      />

      <FormInput
        label="Role"
        name="role"
        as="select"
        value={form.role}
        error={errors.role}
        onChange={handleChange}
      >
        {USER_ROLES.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </FormInput>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link
          to="/forgot-password"
          className="small text-decoration-none"
        >
          Forgot password?
        </Link>

        <Link
          to="/verify-2fa"
          className="small text-decoration-none"
        >
          Use 2FA
        </Link>
      </div>

      <button
        className="btn btn-primary w-100"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Login'}
      </button>

      <div className="d-flex justify-content-center mt-3">
        {googleLoading ? (
          <button className="btn btn-outline-dark w-100" type="button" disabled>
            Connecting Google...
          </button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            width="360"
            text="continue_with"
          />
        )}
      </div>

      <p className="text-secondary mb-0 mt-3 text-center">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </form>
  )
}

export default Login
