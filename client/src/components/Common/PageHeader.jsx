function PageHeader({ title, subtitle, action }) {
  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
      <div>
        <h1 className="page-title h3 mb-1">{title}</h1>
        {subtitle ? <p className="text-secondary mb-0">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

export default PageHeader
