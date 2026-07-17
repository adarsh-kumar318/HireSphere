import { useState } from 'react'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import PageHeader from '../../components/Common/PageHeader'

function CompanyProfile() {
  const [form, setForm] = useState({
    companyName: 'Acme Labs',
    email: 'hr@acmelabs.com',
    industry: 'Product',
    website: 'https://acmelabs.example',
    location: 'Bengaluru',
    description: 'Building modern web platforms for enterprise teams.',
  })

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toast.success('Company profile saved')
  }

  return (
    <>
      <PageHeader title="Company Profile" subtitle="Maintain company details visible to students." />
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body row g-3">
          {Object.entries(form).map(([name, value]) => (
            <div className={name === 'description' ? 'col-12' : 'col-md-6'} key={name}>
              <FormInput
                label={name.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())}
                name={name}
                as={name === 'description' ? 'textarea' : 'input'}
                rows={name === 'description' ? '4' : undefined}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="card-footer bg-white text-end">
          <button className="btn btn-primary" type="submit">Save Profile</button>
        </div>
      </form>
    </>
  )
}

export default CompanyProfile
