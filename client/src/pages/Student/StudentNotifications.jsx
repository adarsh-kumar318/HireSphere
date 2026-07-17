import PageHeader from '../../components/Common/PageHeader'

const notifications = [
  { id: 1, title: 'Interview invitation', message: 'Wipro has shortlisted you for the technical round.' },
  { id: 2, title: 'New job match', message: 'A React Developer role matches your skills.' },
]

function StudentNotifications() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="Placement updates and job alerts." />
      <div className="list-group">
        {notifications.map((item) => (
          <div className="list-group-item" key={item.id}>
            <h2 className="h6 mb-1">{item.title}</h2>
            <p className="mb-0 text-secondary">{item.message}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default StudentNotifications
