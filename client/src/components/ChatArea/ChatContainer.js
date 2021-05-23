import React, { useRef, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap';
import './ChatContainer.css';
import { io } from 'socket.io-client';
import querystring from 'query-string';

const Server = 'http://localhost:5000';
let socket;

function ChatContainer({ location }) {
  //handles the user input in chat
  const [message, setMessage] = useState('');
  //handling of messaging back/front ends
  const [messages, setMessages] = useState([]);
  // sets name and room
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');

  useEffect(() => {
    //grabs user credentials and room data from prop location (URL)
    const { name, room } = querystring.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    socket = io(Server);
    // setName(name);
    // setRoom(room);
    //send user credentials and room to the server
    socket.emit('joinChat', { name, room });
  }, [Server, location.search]);

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
    //send messages to the display
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
      console.log('======', message);
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
          {/* list connected users */}
          <Container
            style={{ borderStyle: 'solid', height: '50vh', padding: '15px' }}
          >
            <h1>users list</h1>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatContainer;
