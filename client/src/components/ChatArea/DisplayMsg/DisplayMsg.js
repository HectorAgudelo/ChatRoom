import React from 'react';
import { Container } from 'react-bootstrap';
import './DisplayMsg.css';

function DisplayMsg({ messages }) {
  return (
    <Container style={{ borderStyle: 'solid', height: '93.5vh' }}>
      <div className='messages'>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </Container>
  );
}

export default DisplayMsg;
