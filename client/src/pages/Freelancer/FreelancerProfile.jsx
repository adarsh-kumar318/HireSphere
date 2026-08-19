import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FreelancerProfileForm from '../../components/Freelancer/FreelancerProfileForm'
import PageHeader from '../../components/Common/PageHeader'
import {
  getFreelancerProfile,
  updateFreelancerProfile,
  uploadFreelancerResume,
} from '../../services/freelancerService'

function FreelancerProfile() {
  const [form, setForm] = useState({
    name: '',
    headline: '',
    location: '',
    hourlyRate: '',
    milestonePricing: '',
    certifications: '',
    skills: '',
    experience: '',
    portfolio: '',
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getFreelancerProfile()

        const profile = data?.profile || data?.freelancer || data

        setForm({
          name: profile?.name || '',
          headline: profile?.headline || '',
          location: profile?.location || '',
          hourlyRate: profile?.hourlyRate || '',
          milestonePricing: profile?.milestonePricing || '',
          certifications: profile?.certifications || '',
          skills: profile?.skills || '',
          experience: profile?.experience || '',
          portfolio: profile?.portfolio || '',
        })
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to load profile'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await updateFreelancerProfile(form)
      toast.success('Profile saved')
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update profile'
      )
    }
  }

  const handleResume = async (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      await uploadFreelancerResume(file)
      toast.success('Resume uploaded')
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to upload resume'
      )
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader
          title="Professional Profile"
          subtitle="Showcase skills, portfolio, certifications, pricing, and verification readiness."
        />

        <div className="card">
          <div className="card-body">
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Professional Profile"
        subtitle="Showcase skills, portfolio, certifications, pricing, and verification readiness."
      />

      <div className="card mb-3">
        <div className="card-body">
          <label className="form-label" htmlFor="resume">
            Resume upload
          </label>

          <input
            id="resume"
            className="form-control"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResume}
          />
        </div>
      </div>

      <FreelancerProfileForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default FreelancerProfile