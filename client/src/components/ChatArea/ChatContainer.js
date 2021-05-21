import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MsgInput from './MsgInput/MsgInput'
import UsersLits from './UsersList/UserList'
import DisplayMsg from './DisplayMsg/DisplayMsg'



function ChatContainer({sendMessage, messages, location}) {

  console.log(location);
  return (
    <Container style={{borderStyle:'ridge', height:'100vh'}}>
      <Row>
        <Col xs={{span:9}}>
          <Row>
            <DisplayMsg messages={messages}/>
          </Row>
          <Row>
            <MsgInput sendMessage={sendMessage} />
          </Row>
        </Col>
        <Col>
          <UsersLits/>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatContainer;
