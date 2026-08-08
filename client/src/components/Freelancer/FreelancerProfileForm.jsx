import FormInput from "../common/forminput";

const FreelancerProfileForm = ({
  form,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Form Body */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

        <FormInput
          label="Professional Name"
          name="name"
          value={form.name}
          onChange={onChange}
        />

        <FormInput
          label="Headline"
          name="headline"
          value={form.headline}
          onChange={onChange}
        />

        <FormInput
          label="Location"
          name="location"
          value={form.location}
          onChange={onChange}
        />

        <FormInput
          label="Hourly Rate"
          name="hourlyRate"
          value={form.hourlyRate}
          onChange={onChange}
        />

        <FormInput
          label="Milestone Pricing"
          name="milestonePricing"
          value={form.milestonePricing}
          onChange={onChange}
        />

        <FormInput
          label="Certifications"
          name="certifications"
          value={form.certifications}
          onChange={onChange}
        />


        <div className="md:col-span-2">
          <FormInput
            label="Skills With Proficiency"
            name="skills"
            value={form.skills}
            onChange={onChange}
          />
        </div>


        <div className="md:col-span-2">
          <FormInput
            label="Work Experience Timeline"
            name="experience"
            as="textarea"
            rows="4"
            value={form.experience}
            onChange={onChange}
          />
        </div>


        <div className="md:col-span-2">
          <FormInput
            label="Portfolio Gallery Links"
            name="portfolio"
            as="textarea"
            rows="3"
            value={form.portfolio}
            onChange={onChange}
          />
        </div>

      </div>


      {/* Footer */}
      <div className="flex justify-end border-t border-gray-200 p-6">

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Profile
        </button>

      </div>

    </form>
  );
};

export default FreelancerProfileForm;