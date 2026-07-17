import { useState } from 'react'
import { toast } from 'react-toastify'
import FormInput from '../../components/Common/FormInput'
import PageHeader from '../../components/Common/PageHeader'

function StudentProfile() {
  const [form, setForm] = useState({
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '9876543210',
    branch: 'CSE',
    cgpa: '8.7',
    graduationYear: '2026',
  })

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toast.success('Profile updated')
  }

  return (
    <>
      <PageHeader title="Profile" subtitle="Keep your academic and contact details current." />
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body row g-3">
          {Object.entries(form).map(([name, value]) => (
            <div className="col-md-6" key={name}>
              <FormInput
                label={name.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())}
                name={name}
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

export default StudentProfile
