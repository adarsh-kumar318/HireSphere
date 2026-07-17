import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import { verifyTwoFactorCode } from '../../services/authService'
import { required } from '../../utils/validators'

function TwoFactorAuth() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!required(code)) {
      setError('Enter the 2FA code')
      return
    }

    try {
      setLoading(true)
      await verifyTwoFactorCode({ code })
      toast.success('Two-factor verification complete')
      navigate('/login')
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || '2FA endpoint is not responding yet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormInput label="Authentication code" name="code" value={code} error={error} onChange={(event) => setCode(event.target.value)} />
      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
        {loading ? 'Checking...' : 'Verify 2FA'}
      </button>
      <p className="text-center mt-3 mb-0"><Link to="/login">Back to login</Link></p>
    </form>
  )
}

export default TwoFactorAuth
