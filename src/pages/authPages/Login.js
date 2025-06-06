import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

import loginImage from '../../assets/login-image.webp';
import styles from '../../styles/formPage.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../../utils/utils';
import { useRedirect } from '../../hooks/useRedirect';
import ErrorAlert from '../../components/ErrorAlert';
import useFormDataHandler from '../../hooks/useFormDataHandler';

/**
 * Render the login page, including a login form for user authentication.
 * 
 * @returns {ReactNode} - An element displaying the full login page.
 */
function Login() {
  useRedirect('loggedIn')
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const {formData: loginData, handleChange} = useFormDataHandler({
    username: '', password: ''
  })
  const {username, password} = loginData;
  const [errors, setErrors] = useState({})

  /**
   * Handle the submitting of the login form data.
   * Sends a POST request to the dj-rest-auth login endpoint.
   * Sets current user, token timestamp and redirects to general feed.
   * 
   * @param {Event} event The event triggered by the clicking of the
   *                      submit login form button.
   */
  const handleSubmit = async event => {
    event.preventDefault();
    try { 
      const {data} = await axios.post('/dj-rest-auth/login/', loginData)
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      toast.success('Logged in!', {position: 'bottom-left'});
      navigate('/general-feed/');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  

  return (
    <Container className='flex-grow-1 d-flex flex-column'>
      <Row className='d-flex flex-grow-1 align-items-center pb-6'>
          <Col xs='12' md='6' className='text-center d-none d-md-block'>
            <Image 
              fluid 
              rounded 
              src={loginImage} 
              className={styles.formImage}
              alt='Login Image - musicians playing keyboards.'
            />
          </Col>
          <Col
              xs='12'
              md='1'
              className='d-none d-md-block'
            /> {/* Col purely for layout formatting */}
          <Col
            xs='12'
            md='5'
            className='bg-light p-3 text-center rounded shadow-sm'
          > {/* Col for all actual form box content */}
            <h1 className='h2 mb-3'>Login</h1>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor='username-entry' className='d-none'>
                  Username
                </Form.Label>
                <Form.Control
                  id='username-entry'
                  type='text'
                  autoComplete='username'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              <ErrorAlert messages={errors?.username} />
              <Form.Group>
                <Form.Label htmlFor='password-entry' className='d-none'>
                  Password
                </Form.Label>
                <Form.Control
                  id='password-entry'
                  type='password'
                  placeholder='Password'
                  name='password'
                  className='mt-3 mb-3'
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              <ErrorAlert messages={errors?.password} />
              <Button type='submit' className='w-100'>
                Submit
              </Button>
              <ErrorAlert messages={errors?.non_field_errors} />
            </Form>
          </Col>
      </Row>
    </Container>
  );
}

export default Login
