import { useState } from 'react'
import { Container, Row, Col, ListGroup, Form, Button, Badge } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { conversations, chatMessages } from '../data/mockData'

function Messages() {
  const [activeId, setActiveId] = useState(1)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(chatMessages)

  const thread = messages[activeId] || []
  const activeConvo = conversations.find((c) => c.id === activeId)

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    const updated = {
      ...messages,
      [activeId]: [
        ...thread,
        { id: Date.now(), sender: 'me', text: newMessage.trim(), time: 'Now' },
      ],
    }
    setMessages(updated)
    setNewMessage('')
  }

  return (
    <Container fluid className="py-4">
      <h1 className="h3 fw-bold mb-4">Messages</h1>
      <Row className="g-0 border rounded-3 shadow-sm bg-white overflow-hidden" style={{ minHeight: 480 }}>
        <Col md={4} className="border-end">
          <div className="p-3 border-bottom fw-semibold">Conversations</div>
          <ListGroup variant="flush">
            {conversations.map((c) => (
              <ListGroup.Item
                key={c.id}
                action
                active={activeId === c.id}
                onClick={() => setActiveId(c.id)}
                className="d-flex align-items-center gap-2 py-3"
              >
                <img src={c.avatar} alt="" className="rounded-circle" width={40} height={40} />
                <div className="flex-grow-1 overflow-hidden">
                  <div className="d-flex justify-content-between">
                    <span className="fw-medium">{c.name}</span>
                    <small className="text-muted">{c.time}</small>
                  </div>
                  <small className="text-muted text-truncate d-block">{c.lastMessage}</small>
                </div>
                {c.unread > 0 && <Badge bg="primary" pill>{c.unread}</Badge>}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={8} className="d-flex flex-column">
          <div className="p-3 border-bottom fw-semibold">
            {activeConvo?.name || 'Select a conversation'}
          </div>

          <div className="chat-thread flex-grow-1 p-3 d-flex flex-column gap-2">
            {thread.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                <div>{msg.text}</div>
                <small className={`d-block mt-1 ${msg.sender === 'me' ? 'text-white-50' : 'text-muted'}`}>{msg.time}</small>
              </div>
            ))}
          </div>

          <Form onSubmit={sendMessage} className="p-3 border-top">
            <div className="input-group">
              <Form.Control
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" variant="primary" className="btn-teal">
                <FiSend />
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Messages
