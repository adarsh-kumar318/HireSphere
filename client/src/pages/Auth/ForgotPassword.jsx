import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import { forgotPassword } from '../../services/authService'
import { isEmail } from '../../utils/validators'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isEmail(email)) {
      setError('Enter a valid email address')
      return
    }

    try {
      setLoading(true)
      await forgotPassword(email)
      toast.success('Password reset instructions sent')
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || 'Unable to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormInput label="Email" name="email" type="email" value={email} error={error} onChange={(event) => setEmail(event.target.value)} />
      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send reset link'}
      </button>
      <p className="text-center mt-3 mb-0">
        <Link to="/login">Back to login</Link>
      </p>
    </form>
  )
}

export default ForgotPassword
