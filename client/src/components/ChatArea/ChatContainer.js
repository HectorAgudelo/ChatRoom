import React, { useRef, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap';
import './ChatArea.css';
import { io } from 'socket.io-client';
import querystring from 'query-string';

const Server = 'http://localhost:5000';
let socket;

function ChatContainer({ location }) {
  //handles the user input in chat
  const [message, setMessage] = useState('');
  //handling of messaging back/front ends
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [room, setRoom] = useState([]);
  console.log(roomUsers);
  useEffect(() => {
    //grabs user credentials and room data from prop location (URL)
    const { name, room } = querystring.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    socket = io(Server);
    //send user credentials and room to the server
    socket.emit('joinChat', { name, room });

    socket.on('roomUsers', (...data) => {
      const room = data[0].room;
      const userNames = [];
      const userData = data[0].users;

      for (let i = 0; i < userData.length; i++) {
        userNames.push(userData[i].name);
      }

      setRoom(room);
      setRoomUsers(userNames);
    });
  }, [location.search]);

  //allows scroll-focus effect
  const focusEffect = useRef(null);
  useEffect(() => {
    if (focusEffect) {
      focusEffect.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [focusEffect]);
  //allows scroll-focus effect

  //handles the user input in chat
  useEffect(() => {
    socket.on('previousMessages', (...data) => {
      setMessages((prev) => prev.concat(data));
    });
    //send messages to the display
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on('disconnect', (message) => {
      setMessages(message);
    });
  }, []);

  // handling messages to the server
  const handleSend = () => {
    // emitting a message to the server
    socket.emit('userMessage', message);
    // clears input bar
    setMessage('');
  };
  //handling of messaging back/front ends

  return (
    <Container style={{ borderStyle: 'ridge', height: '100vh' }}>
      <Row>
        <Col xs={{ span: 9 }}>
          <Row>
            {/* chat display */}
            <Container className='msgDisplay' ref={focusEffect}>
              <div className='messages'>
                {messages.map((msg, i) => (
                  <p key={i}>
                    <span style={{ color: 'red' }}>{msg.name}</span>: {msg.text}
                  </p>
                ))}
              </div>
            </Container>
          </Row>
          <Row>
            {/* input area */}
            <Container style={{ padding: '3px' }}>
              <InputGroup>
                <FormControl
                  type='text'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <InputGroup.Append>
                  <Button variant='warning'>Emoji</Button>
                  <Button variant='primary' onClick={handleSend}>
                    Send
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Container>
          </Row>
        </Col>
        <Col>
        <h1>{room}</h1>
          {/* list connected users */}
          <Container className='userDisplay' ref={focusEffect}>
            
            <div>
              {roomUsers.map((user, i) => (
                <ul key={i}>
                  <span>{user}</span>
                </ul>
              ))}
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatContainer;
