import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import { useAuth } from '../../hooks/useAuth'
import { USER_ROLES } from '../../utils/constants'
import { isEmail, minLength, required, validatePasswordMatch } from '../../utils/validators'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'freelancer',
    location: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const nextErrors = {}
    if (!required(form.name)) nextErrors.name = 'Name is required'
    if (!isEmail(form.email)) nextErrors.email = 'Enter a valid email address'
    if (!required(form.role)) nextErrors.role = 'Role is required'
    if (!required(form.location)) nextErrors.location = 'Location is required'
    if (!minLength(form.password, 6)) nextErrors.password = 'Use at least 6 characters'
    if (!validatePasswordMatch(form.password, form.confirmPassword)) {
      nextErrors.confirmPassword = 'Passwords must match'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      const user = await register(form)
      navigate(`/${user.role || form.role}/dashboard`, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormInput label="Full name" name="name" value={form.name} error={errors.name} onChange={handleChange} />
      <FormInput label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} />
      <FormInput label="Role" name="role" as="select" value={form.role} error={errors.role} onChange={handleChange}>
        {USER_ROLES.map((role) => (
          <option value={role} key={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </FormInput>
      <FormInput label="City or service area" name="location" value={form.location} error={errors.location} onChange={handleChange} />
      <FormInput label="Password" name="password" type="password" value={form.password} error={errors.password} onChange={handleChange} />
      <FormInput label="Confirm password" name="confirmPassword" type="password" value={form.confirmPassword} error={errors.confirmPassword} onChange={handleChange} />
      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>
      <p className="text-center text-secondary mt-3 mb-0">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </form>
  )
}

export default Register
