import FormInput from '../Common/FormInput'

function FreelancerProfileForm({ form, onChange, onSubmit }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="card-body row g-3">
        <div className="col-md-6">
          <FormInput label="Professional name" name="name" value={form.name} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <FormInput label="Headline" name="headline" value={form.headline} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <FormInput label="Location" name="location" value={form.location} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <FormInput label="Hourly rate" name="hourlyRate" value={form.hourlyRate} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <FormInput label="Milestone pricing" name="milestonePricing" value={form.milestonePricing} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <FormInput label="Certifications" name="certifications" value={form.certifications} onChange={onChange} />
        </div>
        <div className="col-12">
          <FormInput label="Skills with proficiency" name="skills" value={form.skills} onChange={onChange} />
        </div>
        <div className="col-12">
          <FormInput label="Work experience timeline" name="experience" as="textarea" rows="4" value={form.experience} onChange={onChange} />
        </div>
        <div className="col-12">
          <FormInput label="Portfolio gallery links" name="portfolio" as="textarea" rows="3" value={form.portfolio} onChange={onChange} />
        </div>
      </div>
      <div className="card-footer bg-white text-end">
        <button className="btn btn-primary" type="submit">Save Profile</button>
      </div>
    </form>
  )
}

export default FreelancerProfileForm
