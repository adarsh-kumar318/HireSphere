const toneMap = {
  Active: 'success',
  Approved: 'success',
  Selected: 'success',
  Open: 'success',
  Verified: 'success',
  Released: 'success',
  Applied: 'primary',
  Submitted: 'primary',
  Escrowed: 'primary',
  Shortlisted: 'info',
  Interview: 'warning',
  Negotiating: 'warning',
  Mediation: 'warning',
  'Evidence Review': 'warning',
  Pending: 'warning',
  Rejected: 'danger',
  Suspended: 'danger',
  Closed: 'secondary',
  'In Progress': 'info',
}

function StatusBadge({ status }) {
  const tone = toneMap[status] || 'secondary'

  return <span className={`badge text-bg-${tone}`}>{status || 'N/A'}</span>
}

export default StatusBadge
