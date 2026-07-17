import ChatPanel from '../../components/Common/ChatPanel'
import MilestoneTracker from '../../components/Common/MilestoneTracker'
import PageHeader from '../../components/Common/PageHeader'
import { messages, milestones } from '../../data/skillSphereData'

function FreelancerCollaboration() {
  return (
    <>
      <PageHeader title="Collaboration" subtitle="Work with clients through chat, files, video, and progress logs." />
      <div className="row g-3">
        <div className="col-lg-7"><ChatPanel messages={messages} /></div>
        <div className="col-lg-5"><MilestoneTracker milestones={milestones} /></div>
      </div>
    </>
  )
}

export default FreelancerCollaboration
