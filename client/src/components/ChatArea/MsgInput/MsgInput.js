import React, { useState } from 'react';
import { InputGroup, Button, FormControl, Container } from 'react-bootstrap';

function MsgInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
   
    sendMessage(message);
    setMessage('');
  };

  return (
    <Container style={{padding:'3px'}}>
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
  );
}

export default MsgInput;
