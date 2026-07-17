import { useState } from 'react'
import { toast } from 'react-toastify'
import FreelancerProfileForm from '../../components/Freelancer/FreelancerProfileForm'
import PageHeader from '../../components/Common/PageHeader'
import { updateFreelancerProfile, uploadFreelancerResume } from '../../services/freelancerService'

function FreelancerProfile() {
  const [form, setForm] = useState({
    name: 'Ananya Rao',
    headline: 'React and Node.js Specialist',
    location: 'Bengaluru',
    hourlyRate: '1200/hr',
    milestonePricing: 'Starts at Rs 25000',
    certifications: 'AWS Cloud Practitioner, Meta Frontend',
    skills: 'React: Expert, Node.js: Advanced, MongoDB: Advanced',
    experience: '2023 - Present: Freelance MERN consultant',
    portfolio: 'https://portfolio.example/project-one',
  })

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateFreelancerProfile(form)
      toast.success('Profile saved')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile endpoint is not responding yet')
    }
  }

  const handleResume = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await uploadFreelancerResume(file)
      toast.success('Resume uploaded')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Resume upload endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Professional Profile" subtitle="Showcase skills, portfolio, certifications, pricing, and verification readiness." />
      <div className="card mb-3">
        <div className="card-body">
          <label className="form-label" htmlFor="resume">Resume upload</label>
          <input id="resume" className="form-control" type="file" accept=".pdf,.doc,.docx" onChange={handleResume} />
        </div>
      </div>
      <FreelancerProfileForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  )
}

export default FreelancerProfile
