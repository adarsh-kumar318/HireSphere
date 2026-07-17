import PageHeader from '../../components/Common/PageHeader'

const notifications = [
  { id: 1, title: 'New company awaiting approval', message: 'Acme Labs submitted profile documents.' },
  { id: 2, title: 'Interview schedule updated', message: 'TCS moved the technical round to Friday.' },
  { id: 3, title: 'Placement report ready', message: 'June placement summary has been generated.' },
]

function AdminNotifications() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="Important placement cell alerts." />
      <div className="list-group">
        {notifications.map((item) => (
          <div className="list-group-item list-group-item-action" key={item.id}>
            <div className="d-flex w-100 justify-content-between">
              <h2 className="h6 mb-1">{item.title}</h2>
              <small className="text-secondary">Today</small>
            </div>
            <p className="mb-0 text-secondary">{item.message}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminNotifications
