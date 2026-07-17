function StatCard({ icon: Icon, label, value, tone = 'primary', helper }) {
  return (
    <div className="card metric-card h-100">
      <div className="card-body d-flex align-items-start justify-content-between gap-3">
        <div>
          <p className="text-secondary small mb-1">{label}</p>
          <h2 className="h3 fw-bold mb-1">{value}</h2>
          {helper ? <span className="small text-secondary">{helper}</span> : null}
        </div>
        {Icon ? (
          <span className={`badge text-bg-${tone} p-3`}>
            <Icon size={22} />
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default StatCard
