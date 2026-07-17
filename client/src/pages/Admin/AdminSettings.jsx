import { useState } from 'react'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import PageHeader from '../../components/Common/PageHeader'

function AdminSettings() {
  const [form, setForm] = useState({
    marketplaceRadius: '25 km',
    commissionRate: '8%',
    autoApproveVerifiedFreelancers: false,
    fraudReviewThreshold: '70',
  })

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toast.success('Platform settings saved')
  }

  return (
    <>
      <PageHeader title="Settings" subtitle="Configure marketplace radius, commission, verification, and fraud thresholds." />
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <FormInput label="Marketplace radius" name="marketplaceRadius" value={form.marketplaceRadius} onChange={handleChange} />
          <FormInput label="Commission rate" name="commissionRate" value={form.commissionRate} onChange={handleChange} />
          <FormInput label="Fraud review threshold" name="fraudReviewThreshold" value={form.fraudReviewThreshold} onChange={handleChange} />
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="autoApproveVerifiedFreelancers" name="autoApproveVerifiedFreelancers" checked={form.autoApproveVerifiedFreelancers} onChange={handleChange} />
            <label className="form-check-label" htmlFor="autoApproveVerifiedFreelancers">Auto-approve verified freelancers for low-risk gigs</label>
          </div>
        </div>
        <div className="card-footer bg-white text-end">
          <button className="btn btn-primary" type="submit">Save Settings</button>
        </div>
      </form>
    </>
  )
}

export default AdminSettings
