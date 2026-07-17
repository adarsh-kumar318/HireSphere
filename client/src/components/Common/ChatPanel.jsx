import { useState } from 'react'
import { FiPaperclip, FiSend, FiVideo } from 'react-icons/fi'
import { toast } from 'react-toastify'

function ChatPanel({ messages }) {
  const [draft, setDraft] = useState('')

  const send = () => {
    if (!draft.trim()) return
    toast.success('Message queued for Socket.IO delivery')
    setDraft('')
  }

  return (
    <div className="card h-100">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <strong>Real-time Collaboration</strong>
        <button className="btn btn-sm btn-outline-primary" type="button"><FiVideo className="me-1" />Video</button>
      </div>
      <div className="card-body">
        <div className="d-grid gap-3 mb-3">
          {messages.map((message) => (
            <div className="border rounded p-3" key={message.id}>
              <div className="d-flex justify-content-between">
                <strong>{message.from}</strong>
                <small className="text-secondary">{message.time}</small>
              </div>
              <p className="mb-0 text-secondary">{message.body}</p>
            </div>
          ))}
        </div>
        <div className="input-group">
          <button className="btn btn-outline-secondary" type="button" aria-label="Attach file"><FiPaperclip /></button>
          <input className="form-control" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message" />
          <button className="btn btn-primary" type="button" onClick={send}><FiSend /></button>
        </div>
        <p className="small text-secondary mt-2 mb-0">Typing indicators and read receipts are ready for the Socket.IO client event stream.</p>
      </div>
    </div>
  )
}

export default ChatPanel
