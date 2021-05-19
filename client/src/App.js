import './App.css';
import ChatContainer from './components/ChatArea/ChatContainer';
import Login from './components/ChatAccess/ChatAccess';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Server = 'http://localhost:5000';

function App() {
  const [messages, setMessages] = useState([]);
  console.log(messages);
  var socket = io(Server);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected with the back end socket client');
    });
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
      console.log('======', message);
    });
  }, []);

  function sendMessage(message) {
    console.log(message);
    // emitting a message to the server
    socket.emit('userMessage', message);
  }

  return (
    <div className='App'>
      <ChatContainer sendMessage={sendMessage} messages={messages} />
      <Login/>
    </div>
  );
}

export default App;
