import { FiInbox } from 'react-icons/fi'

function EmptyState({ title = 'Nothing here yet', message = 'Records will appear here when available.' }) {
  return (
    <div className="empty-state text-center p-4">
      <FiInbox className="text-secondary mb-2" size={32} />
      <h2 className="h5 mb-1">{title}</h2>
      <p className="text-secondary mb-0">{message}</p>
    </div>
  )
}

export default EmptyState
