import { useState } from 'react'
import { toast } from 'react-toastify'
import GigForm from '../../components/Client/GigForm'
import PageHeader from '../../components/Common/PageHeader'
import { createGig } from '../../services/clientService'
import { required } from '../../utils/validators'

const initialForm = {
  title: '',
  location: '',
  category: '',
  type: '',
  budget: '',
  skills: '',
  milestones: '',
  description: '',
}

function PostGig() {
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
      await createGig(form)
      toast.success('Gig published')
      setForm(initialForm)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Create gig endpoint is not responding yet')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader title="Post a Gig" subtitle="Define budget, milestones, attachments, and matching requirements." />
      <GigForm form={form} errors={errors} saving={saving} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  )
}

export default PostGig
