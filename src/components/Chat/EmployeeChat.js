import React, { useState } from 'react';
import './EmployeeChat.scss';

const users = [
  { id: 'Quang', name: 'Quang', avatar: '👤', messages: [
    { sender: 'Quang', text: 'Hi A, how are you?', time: '10:10 AM' },
    { sender: 'A', text: 'Hey B, I’m good! Working on some tasks. What about you?', time: '10:12 AM' },
    { sender: 'Quang', text: 'Just checking in. How’s the project going?', time: '10:15 AM' },
    { sender: 'A', text: 'It’s going well. Just need to finish a few more things.', time: '10:18 AM' },
    { sender: 'A', text: 'Let me know if you need any updates!', time: '10:20 AM' }
  ]},
  { id: 'Quynh', name: 'Quynh', avatar: '👤', messages: [
    { sender: 'Quynh', text: 'Hello A, can we discuss the project?', time: '11:00 AM' },
    { sender: 'A', text: 'Sure, C! What do you need help with?', time: '11:05 AM' },
    { sender: 'Quynh', text: 'I’m having trouble with the latest build.', time: '11:10 AM' },
    { sender: 'A', text: 'Alright, I’ll check it out and get back to you.', time: '11:15 AM' },
    { sender: 'A', text: 'Hang tight! 😊', time: '11:18 AM' }
  ]}
];

const EmployeeChat = () => {
  const [activeUser, setActiveUser] = useState(users[0]);

  return (
    <div className="chat-container">
      {/* Sidebar for Users */}
      <div className="user-list">
        <h2>Tin nhắn</h2>
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user ${user.id === activeUser.id ? 'active' : ''}`} 
            onClick={() => setActiveUser(user)}
          >
            <div className="avatar">{user.avatar}</div>
            <div className="user-info">
              <span className="username">{user.name}</span>
            </div>
            <span className="message-time">{user.messages[user.messages.length - 1].time}</span>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        <div className="chat-header">
          <button onClick={() => setActiveUser(null)}>&larr;</button>
          <h3>{activeUser.name}</h3>
        </div>
        <div className="messages">
          {activeUser.messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'A' ? 'sent' : 'received'}`}>
              <span className="message-text">{msg.text}</span>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input type="text" placeholder="Enter text here..." />
          <button>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeChat;
