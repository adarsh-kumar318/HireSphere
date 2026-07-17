import { useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/Common/PageHeader'
import { uploadResume } from '../../services/studentService'

function ResumeUpload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) {
      toast.error('Choose a resume file first')
      return
    }

    try {
      setLoading(true)
      await uploadResume(file)
      toast.success('Resume uploaded')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Resume upload endpoint is not responding yet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="Resume Upload" subtitle="Upload your latest resume in PDF or DOC format." />
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body text-center p-5">
          <FiUploadCloud size={48} className="text-primary mb-3" />
          <input
            className="form-control"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          {file ? <p className="text-secondary mt-3 mb-0">Selected: {file.name}</p> : null}
        </div>
        <div className="card-footer bg-white text-end">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      </form>
    </>
  )
}

export default ResumeUpload
