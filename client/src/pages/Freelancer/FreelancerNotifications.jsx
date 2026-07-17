import NotificationList from '../../components/Common/NotificationList'
import PageHeader from '../../components/Common/PageHeader'
import { notifications } from '../../data/skillSphereData'

function FreelancerNotifications() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="New gigs, proposal decisions, payments, and reviews." />
      <NotificationList items={notifications} />
    </>
  )
}

export default FreelancerNotifications
