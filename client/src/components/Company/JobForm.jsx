import { jobTypes } from '../../utils/constants'
import FormInput from '../Common/FormInput'

function JobForm({ form, errors, saving, onChange, onSubmit }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <FormInput label="Job title" name="title" value={form.title} error={errors.title} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <FormInput label="Location" name="location" value={form.location} error={errors.location} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <FormInput label="Job type" name="type" as="select" value={form.type} error={errors.type} onChange={onChange}>
              <option value="">Select type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-6">
            <FormInput label="Package" name="package" value={form.package} error={errors.package} onChange={onChange} />
          </div>
          <div className="col-12">
            <FormInput
              label="Required skills"
              name="skills"
              value={form.skills}
              error={errors.skills}
              onChange={onChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          <div className="col-12">
            <FormInput
              label="Description"
              name="description"
              as="textarea"
              rows="5"
              value={form.description}
              error={errors.description}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className="card-footer bg-white text-end">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Create Job'}
        </button>
      </div>
    </form>
  )
}

export default JobForm
