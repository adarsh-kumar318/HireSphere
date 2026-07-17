import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import { resetPassword } from '../../services/authService'
import { minLength, validatePasswordMatch } from '../../utils/validators'

function ResetPassword() {
  const { token } = useParams()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}
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
      await resetPassword({ token, password: form.password })
      toast.success('Password reset successful')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormInput label="New password" name="password" type="password" value={form.password} error={errors.password} onChange={handleChange} />
      <FormInput label="Confirm password" name="confirmPassword" type="password" value={form.confirmPassword} error={errors.confirmPassword} onChange={handleChange} />
      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Reset password'}
      </button>
      <p className="text-center mt-3 mb-0">
        <Link to="/login">Back to login</Link>
      </p>
    </form>
  )
}

export default ResetPassword
