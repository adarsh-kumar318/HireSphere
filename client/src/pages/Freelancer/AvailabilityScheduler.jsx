import { useState } from 'react'
import { toast } from 'react-toastify'
import PageHeader from '../../components/Common/PageHeader'
import { updateAvailability } from '../../services/freelancerService'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

function AvailabilityScheduler() {
  const [slots, setSlots] = useState({ Monday: true, Tuesday: true, Wednesday: false, Thursday: true, Friday: false })

  const save = async () => {
    try {
      await updateAvailability(slots)
      toast.success('Availability saved')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Availability endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader
        title="Availability Scheduler"
        subtitle="Set booking slots for clients and automatic scheduling."
        action={<button className="btn btn-primary" type="button" onClick={save}>Save Availability</button>}
      />
      <div className="row g-3">
        {days.map((day) => (
          <div className="col-md" key={day}>
            <div className="card h-100">
              <div className="card-body">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={day}
                    checked={slots[day]}
                    onChange={(event) => setSlots((current) => ({ ...current, [day]: event.target.checked }))}
                  />
                  <label className="form-check-label fw-semibold" htmlFor={day}>{day}</label>
                </div>
                <p className="small text-secondary mt-2 mb-0">{slots[day] ? 'Open for booking' : 'Unavailable'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AvailabilityScheduler
