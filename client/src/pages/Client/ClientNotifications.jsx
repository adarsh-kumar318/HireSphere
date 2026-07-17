import NotificationList from '../../components/Common/NotificationList'
import PageHeader from '../../components/Common/PageHeader'
import { notifications } from '../../data/skillSphereData'

function ClientNotifications() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="Real-time alerts for proposals, payments, reviews, and new matches." />
      <NotificationList items={notifications} />
    </>
  )
}

export default ClientNotifications
