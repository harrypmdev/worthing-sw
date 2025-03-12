import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import loginImage from '../../assets/login-image.webp';
import styles from '../../styles/RegisterLogin.module.css';


function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password1: '',
    password2: '',
  })
  const {username, password1, password2} = loginData();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
       // API contact 
    } catch (err) {
      // Catch error
    }
  }

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column">
    <Row className="d-flex flex-grow-1 align-items-center pb-6">
        <Col xs="12" md="6" className="text-center d-none d-md-block">
        <Image fluid rounded src={loginImage} className={styles.registerImage} />
        </Col>
        <Col 
            xs='12'
            md='1'
            className='d-none d-md-block'
          />
        <Col
          xs="12" 
          md="5"
          className="bg-light p-3 text-center rounded shadow-sm"
        >
        <h1 className="h2 mb-3">Login</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='d-none'>Username</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Username"
              name="username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='d-none'>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Password"
              name="password"
              className='mt-3 mb-3'
            />
          </Form.Group> 
          <Button type="submit" className='w-100'>
            Submit
          </Button>
        </Form>
        </Col>
    </Row>
    </Container>
);
}

export default Login
