import ChatPanel from '../../components/Common/ChatPanel'
import MilestoneTracker from '../../components/Common/MilestoneTracker'
import PageHeader from '../../components/Common/PageHeader'
import { messages, milestones } from '../../data/skillSphereData'

function ClientCollaboration() {
  return (
    <>
      <PageHeader title="Collaboration" subtitle="Chat, files, read receipts, video calls, and milestone updates." />
      <div className="row g-3">
        <div className="col-lg-7"><ChatPanel messages={messages} /></div>
        <div className="col-lg-5"><MilestoneTracker milestones={milestones} /></div>
      </div>
    </>
  )
}

export default ClientCollaboration
