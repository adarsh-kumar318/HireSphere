import FormInput from "../../common/FormInput";

const GigForm = ({
  form,
  errors = {},
  saving = false,
  categories = [],
  gigTypes = [],
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        {/* Title */}
        <FormInput
          label="Gig Title"
          name="title"
          value={form.title}
          error={errors.title}
          onChange={onChange}
          placeholder="Enter gig title"
          required
        />

        {/* Location */}
        <FormInput
          label="Location"
          name="location"
          value={form.location}
          error={errors.location}
          onChange={onChange}
          placeholder="Remote / Delhi / Mumbai"
        />

        {/* Category */}
        <FormInput
          label="Category"
          name="category"
          as="select"
          value={form.category}
          error={errors.category}
          onChange={onChange}
          required
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </FormInput>

        {/* Pricing Model */}
        <FormInput
          label="Pricing Model"
          name="type"
          as="select"
          value={form.type}
          error={errors.type}
          onChange={onChange}
          required
        >
          <option value="">Select Pricing Model</option>

          {gigTypes.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </FormInput>

        {/* Budget */}
        <FormInput
          label="Budget"
          name="budget"
          value={form.budget}
          error={errors.budget}
          onChange={onChange}
          placeholder="₹25,000"
        />

        {/* Deadline */}
        <FormInput
          label="Deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          error={errors.deadline}
          onChange={onChange}
        />

        {/* Skills */}
        <div className="lg:col-span-2">
          <FormInput
            label="Required Skills"
            name="skills"
            value={form.skills}
            error={errors.skills}
            onChange={onChange}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        {/* Milestones */}
        <div className="lg:col-span-2">
          <FormInput
            label="Milestones"
            name="milestones"
            as="textarea"
            rows={4}
            value={form.milestones}
            error={errors.milestones}
            onChange={onChange}
            placeholder="Describe project milestones..."
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <FormInput
            label="Project Description"
            name="description"
            as="textarea"
            rows={6}
            value={form.description}
            error={errors.description}
            onChange={onChange}
            placeholder="Describe your project requirements..."
            required
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-slate-200 p-6 dark:border-slate-800 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Publishing..." : "Publish Gig"}
        </button>
      </div>
    </form>
  );
};

export default GigForm;