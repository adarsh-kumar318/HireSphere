import { FiPlus, FiX } from 'react-icons/fi'

function SkillEditor({ skills, value, onValueChange, onAdd, onRemove }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            placeholder="Add a skill"
          />
          <button className="btn btn-primary" type="button" onClick={onAdd}>
            <FiPlus className="me-1" />
            Add
          </button>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span className="badge rounded-pill text-bg-light border p-2" key={skill}>
              {skill}
              <button
                className="btn btn-sm btn-link text-danger p-0 ms-2"
                type="button"
                onClick={() => onRemove(skill)}
                aria-label={`Remove ${skill}`}
              >
                <FiX />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillEditor
