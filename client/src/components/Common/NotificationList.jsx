function NotificationList({ items }) {
  return (
    <div className="list-group">
      {items.map((item) => (
        <div className="list-group-item" key={item.id}>
          <div className="d-flex justify-content-between gap-3">
            <h2 className="h6 mb-1">{item.title}</h2>
            <span className="badge text-bg-light border">{item.type}</span>
          </div>
          <p className="text-secondary mb-0">{item.message}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationList
