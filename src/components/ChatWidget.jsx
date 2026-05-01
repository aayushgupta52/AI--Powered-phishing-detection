import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I\'m your CyberShield AI Assistant. I can help you with online safety, URL checking, and phishing protection. How can I help you today?' }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatBodyRef = useRef(null)

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const sendMessage = async () => {
        const text = input.trim()
        if (!text) return

        setMessages(prev => [...prev, { role: 'user', text }])
        setInput('')
        setIsTyping(true)

        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            })
            const data = await response.json()
            setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
        } catch {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: 'Sorry, I\'m currently offline. Please make sure the server is running (npm run server). In the meantime, here are some tips:\n\n• Never click suspicious links\n• Verify sender email addresses\n• Use strong, unique passwords\n• Enable two-factor authentication'
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className={`chat-fab ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat"
            >
                <span className="fab-icon">{isOpen ? '✕' : '💬'}</span>
                {!isOpen && <span className="fab-pulse"></span>}
            </button>

            {/* Chat Window */}
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-status-dot"></div>
                        <div>
                            <h4>CyberShield AI</h4>
                            <span className="chat-status-text">Online • Powered by Gemini</span>
                        </div>
                    </div>
                    <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                {/* Body */}
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-msg ${msg.role}`}>
                            {msg.role === 'bot' && <span className="msg-avatar">🛡️</span>}
                            <div className="msg-bubble">
                                {msg.text.split('\n').map((line, j) => (
                                    <span key={j}>{line}<br /></span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-msg bot">
                            <span className="msg-avatar">🛡️</span>
                            <div className="msg-bubble typing">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="chat-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about cybersecurity..."
                        className="chat-input"
                    />
                    <button onClick={sendMessage} className="chat-send" disabled={!input.trim()}>
                        ➤
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatWidget
