import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import FormInput from '../../components/Common/FormInput'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { USER_ROLES } from '../../utils/constants'
import { isEmail, required, minLength } from '../../utils/validators'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'freelancer' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const nextErrors = {}
    if (!required(form.name)) nextErrors.name = 'Name is required'
    if (!isEmail(form.email)) nextErrors.email = 'Enter a valid email address'
    if (!minLength(form.password, 8)) nextErrors.password = 'Password must be at least 8 characters'
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
      await register(form)
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) { toast.error('Google did not return a credential'); return }
    try {
      setGoogleLoading(true)
      const user = await loginWithGoogle({ credential: credentialResponse.credential, role: form.role })
      navigate(`/${user.role || form.role}/dashboard`, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google sign-up failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-xl font-bold text-white mb-6 text-center">Create your account</h2>

      <FormInput
        label="Full name"
        name="name"
        type="text"
        value={form.name}
        error={errors.name}
        onChange={handleChange}
        placeholder="John Doe"
        icon={FiUser}
      />

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
        placeholder="At least 8 characters"
        icon={FiLock}
      />

      <FormInput
        label="I want to"
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

      <Button type="submit" loading={loading} className="w-full justify-center mt-6">
        Create Account
      </Button>

      <div className="relative my-6">
        <div className="divider" />
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <span className="bg-[#1E293B] px-3 text-xs font-medium text-slate-400 uppercase tracking-widest">or sign up with</span>
        </span>
      </div>

      <div className="flex justify-center">
        {googleLoading ? (
          <Button variant="secondary" className="w-full justify-center" disabled>Connecting Google...</Button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google sign-up failed')}
            width="360"
            theme="filled_black"
            text="signup_with"
            shape="rectangular"
          />
        )}
      </div>

      <p className="text-slate-400 text-sm text-center mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in</Link>
      </p>
    </form>
  )
}

export default Register
