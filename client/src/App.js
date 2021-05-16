import './App.css';
import ChatContainer from './components/ChatArea/ChatContainer';
import Login from './components/ChatAccess/ChatAccess';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Server = 'http://localhost:5000';

function App() {
  const [messages, setMessages] = useState(['this is a test message']);

  var socket = io(Server);
  socket.on('connect', () => {
    console.log('connected with the back end socket client');
  });

  socket.on('message', (message) => {
    // setMessages(messages.concat([message]));
    console.log(message)
  });

  function sendMessage(message) {
    socket.emit('message', message);
  }

  return (
    <div className='App'>
      {/* <ChatContainer sendMessage={sendMessage} messages={messages} /> */}
      <Login/>
    </div>
  );
}

export default App;
