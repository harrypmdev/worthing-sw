import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';
import { Alert } from 'react-bootstrap';

import registerImage from '../../assets/register-image.webp';
import styles from '../../styles/RegisterLogin.module.css';
import useFormDataHandler from '../../hooks/useFormDataHandler';
import { toast } from 'react-toastify';

/**
 * Render the register page, including a register form for user authentication.
 * 
 * @returns {ReactNode} - An element displaying the full register page.
 */
function Register() {
  useRedirect('loggedIn')
  const navigate = useNavigate();

  const {formData: registerData, handleChange} = useFormDataHandler({
    username: '',
    email: '',
    password1: '',
    password2: '',
  })
  const {username, email, password1, password2} = registerData;

  const [errors, setErrors] = useState({})

  /**
   * Handle the submitting of the register form data.
   * Sends a POST request to the dj-rest-auth registration endpoint.
   * Redirects to login page.
   * 
   * @param {Event} event The event triggered by the clicking of the submit
   *                      register form button.
   */
  const handleSubmit = async event => {
    event.preventDefault();
    try { 
      await axios.post('/dj-rest-auth/registration/', registerData)
      toast.success('Registered!', {position: 'bottom-left'})
      navigate('/login/');
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      <Row className="d-flex flex-grow-1 align-items-center pb-6">
        <Col xs="12" md="6" className="text-center d-none d-md-block">
          <Image 
            fluid 
            rounded 
            src={registerImage} 
            className={styles.registerImage} 
            alt='Register Image - a man playing electric guitar.'
          />
        </Col>
        <Col 
          xs='12'
          md='1'
          className='d-none d-md-block'
        />
        <Col
          xs="12" 
          md="5"
          className="text-center bg-light my-2 p-3 rounded shadow-sm"
        >
          <h1 className="h2 mb-3">Register</h1>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Username*"
                name="username"
                value={username}
                className='mt-1 mb-3'
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => 
              <Alert variant='warning' key={idx}>{message}</Alert>
            )}
            <Form.Group>
              <Form.Label className='d-none'>Email</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                className='my-3'
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => 
              <Alert variant='warning' key={idx}>{message}</Alert>
            )}
            <Form.Group>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Password*"
                name="password1"
                value={password1}
                className='my-3'
                onChange={handleChange}
              />
            </Form.Group> 
            {errors.password1?.map((message, idx) => 
              <Alert variant='warning' key={idx}>{message}</Alert>
            )}
            <Form.Group>
              <Form.Label className='d-none'>Confirm Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Confirm Password*"
                name="password2"
                value={password2}
                className='my-3'
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => 
              <Alert variant='warning' key={idx}>{message}</Alert>
            )}
            <Button type="submit" className="w-100" >
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant='warning' className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register
