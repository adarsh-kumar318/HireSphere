import { gigCategories, gigTypes } from '../../utils/constants'
import FormInput from '../Common/FormInput'

function GigForm({ form, errors, saving, onChange, onSubmit }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <FormInput label="Gig title" name="title" value={form.title} error={errors.title} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <FormInput label="Location" name="location" value={form.location} error={errors.location} onChange={onChange} />
          </div>
          <div className="col-md-4">
            <FormInput label="Category" name="category" as="select" value={form.category} error={errors.category} onChange={onChange}>
              <option value="">Select category</option>
              {gigCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-4">
            <FormInput label="Pricing model" name="type" as="select" value={form.type} error={errors.type} onChange={onChange}>
              <option value="">Select model</option>
              {gigTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-4">
            <FormInput label="Budget range" name="budget" value={form.budget} error={errors.budget} onChange={onChange} placeholder="25000 - 75000" />
          </div>
          <div className="col-12">
            <FormInput label="Required skills" name="skills" value={form.skills} error={errors.skills} onChange={onChange} placeholder="React, Figma, Local SEO" />
          </div>
          <div className="col-12">
            <FormInput label="Milestones" name="milestones" as="textarea" rows="3" value={form.milestones} error={errors.milestones} onChange={onChange} />
          </div>
          <div className="col-12">
            <FormInput label="Project description" name="description" as="textarea" rows="5" value={form.description} error={errors.description} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="card-footer bg-white text-end">
        <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Publishing...' : 'Publish Gig'}</button>
      </div>
    </form>
  )
}

export default GigForm
