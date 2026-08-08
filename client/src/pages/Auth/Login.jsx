import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import FormInput from '../../components/Common/FormInput'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { USER_ROLES } from '../../utils/constants'
import { isEmail, required } from '../../utils/validators'
import { FiMail, FiLock } from 'react-icons/fi'

function Login() {
  const [form, setForm] = useState({ email: '', password: '', role: 'freelancer' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const validate = () => {
    const nextErrors = {}
    if (!isEmail(form.email)) nextErrors.email = 'Enter a valid email address'
    if (!required(form.password)) nextErrors.password = 'Password is required'
    if (!required(form.role)) nextErrors.role = 'Choose a role'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (e) => {
    setForm((c) => ({ ...c, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setLoading(true)
      const user = await login(form)
      navigate(location.state?.from?.pathname || `/${user.role || form.role}/dashboard`, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) { toast.error('Google did not return a credential'); return }
    try {
      setGoogleLoading(true)
      const user = await loginWithGoogle({ credential: credentialResponse.credential, role: form.role })
      navigate(location.state?.from?.pathname || `/${user.role || form.role}/dashboard`, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-xl font-bold text-white mb-6 text-center">Sign in to your account</h2>

      <FormInput
        label="Email address"
        name="email"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="you@example.com"
        icon={FiMail}
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={handleChange}
        placeholder="Enter your password"
        icon={FiLock}
      />

      <FormInput
        label="I am a"
        name="role"
        as="select"
        value={form.role}
        error={errors.role}
        onChange={handleChange}
      >
        {USER_ROLES.map((role) => (
          <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
        ))}
      </FormInput>

      <div className="flex items-center justify-between mb-6 mt-2 text-sm">
        <Link to="/forgot-password" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Forgot password?
        </Link>
        <Link to="/verify-2fa" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Use 2FA instead
        </Link>
      </div>

      <Button type="submit" loading={loading} className="w-full justify-center">
        Sign In
      </Button>

      <div className="relative my-6">
        <div className="divider" />
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <span className="bg-[#1E293B] px-3 text-xs font-medium text-slate-400 uppercase tracking-widest">or continue with</span>
        </span>
      </div>

      <div className="flex justify-center">
        {googleLoading ? (
          <Button variant="secondary" className="w-full justify-center" disabled>
            Connecting Google...
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            width="360"
            theme="filled_black"
            text="continue_with"
            shape="rectangular"
          />
        )}
      </div>

      <p className="text-slate-400 text-sm text-center mt-6">
        New here?{' '}
        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          Create an account
        </Link>
      </p>
    </form>
  )
}

export default Login
