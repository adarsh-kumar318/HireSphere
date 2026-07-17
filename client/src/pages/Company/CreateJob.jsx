import { useState } from 'react'
import { toast } from 'react-toastify'
import JobForm from '../../components/Company/JobForm'
import PageHeader from '../../components/Common/PageHeader'
import { createJob } from '../../services/companyService'
import { required } from '../../utils/validators'

const initialForm = {
  title: '',
  location: '',
  type: '',
  package: '',
  skills: '',
  description: '',
}

function CreateJob() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const nextErrors = {}
    Object.entries(form).forEach(([key, value]) => {
      if (!required(value)) nextErrors[key] = 'This field is required'
    })
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
      setSaving(true)
      await createJob(form)
      toast.success('Job created')
      setForm(initialForm)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Create job endpoint is not responding yet')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader title="Create Job" subtitle="Publish a new role for eligible students." />
      <JobForm form={form} errors={errors} saving={saving} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  )
}

export default CreateJob
