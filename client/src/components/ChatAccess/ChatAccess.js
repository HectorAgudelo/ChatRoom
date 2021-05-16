import React from 'react';
import './ChatAccess.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

//landing area where user picks a username

function Login() {
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
                  />
                </Col>
                <Col>
                  <Form.Check
                    type='radio'
                    label='Java Chat'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios2'
                  />
                </Col>
                <Col>
                  <Form.Check
                    type='radio'
                    label='Python Chat'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios3'
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='text-center'>
              <Form.Label>Type a Desired Username</Form.Label>
              <Form.Control type='text' placeholder='' />
            </Form.Group>
            <Button variant='primary' type='submit' className='mx-auto d-block'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
