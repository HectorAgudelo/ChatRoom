import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Server = 'http://localhost:5000';

function App() {
  var socket = io(Server);
  socket.on('connect', () => {
    console.log('connected with the back end socket client');
    socket.send("this is a test message")
  });
  return (
    <div className='App'>
      <h1>hello</h1>
    </div>
  );
}

export default App;
