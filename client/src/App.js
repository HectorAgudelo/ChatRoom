import './App.css';
import ChatContainer from './components/ChatArea/ChatContainer';
import Login from './components/ChatAccess/ChatAccess';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QueryString from 'query-string';
import { io } from 'socket.io-client';

const Server = 'http://localhost:5000';

function App({location}) {
  const [messages, setMessages] = useState([]);
 


  let socket = io(Server);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected with the back end socket client');
    });
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
      console.log('======', message);
    });
  }, [socket]);

  function sendMessage(message) {
    console.log(message);
    // emitting a message to the server
    socket.emit('userMessage', message);
  }

  //   socket.emit('joinChat', {userId, isCheck});

  return (
    <Router className='App'>
      <Route location={location} path='/chat' component={ChatContainer}>
        <ChatContainer sendMessage={sendMessage} messages={messages}/>
      </Route>
      <Route location={location} path='/login' component={Login}>
        <Login />
      </Route>
    </Router>
  );
}

export default App;
