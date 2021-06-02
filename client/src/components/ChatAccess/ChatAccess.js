/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import './ChatAccess.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';





//landing area where user picks a username, and chat rooms

function Login() {
 
  const [userId, setUserId] = useState('');
  const [isCheck, setIsCheck] = useState();


  const prevent = (e) => {
   
 
    if (!userId || !isCheck){
      e.preventDefault()
    }
  
  };

  return (
    <Container className='loginContainer'>
      <Row>
        <Col xs='12'>
          <Form className='loginForm' style={{ padding: '10px' }}>
            <Form.Group className='text-center'>
              <Form.Label as='legend' column sm={12}>
                Chat Rooms Available
              </Form.Label>
              <Row>
                <Col>
                  {' '}
                  <Form.Check
                    type='radio'
                    label='JS Chat'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios1'
                    value='JSChat'
                    onChange={(e) => {
                      setIsCheck(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type='radio'
                    label='Java Chat'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios2'
                    value='JavaChat'
                    onChange={(e) => {
                      setIsCheck(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type='radio'
                    label='Python Chat'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios3'
                    value='PythonChat'
                    onChange={(e) => {
                      setIsCheck(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='text-center'>
              <Form.Label>Type a Desired Username</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
            <Link
             
              onClick={prevent}
              to={`/chat?name=${userId}&room=${isCheck}`}
            >
              <Button
                variant='primary'
                type='submit'
                className='mx-auto d-block'
              >
                Submit
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
