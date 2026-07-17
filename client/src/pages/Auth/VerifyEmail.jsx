import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import { verifyEmail } from '../../services/authService'
import { required } from '../../utils/validators'

function VerifyEmail() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!required(token)) {
      setError('Verification token is required')
      return
    }

    try {
      setLoading(true)
      await verifyEmail(token)
      toast.success('Email verified')
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || 'Email verification endpoint is not responding yet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormInput label="Verification token" name="token" value={token} error={error} onChange={(event) => setToken(event.target.value)} />
      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify Email'}
      </button>
      <p className="text-center mt-3 mb-0"><Link to="/login">Back to login</Link></p>
    </form>
  )
}

export default VerifyEmail
