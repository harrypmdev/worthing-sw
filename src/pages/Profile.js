import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { useCurrentUser } from '../contexts/CurrentUserContext';

const Profile = () => {
  const currentUser = useCurrentUser();

  return (
    <Container className="flex-grow-1 d-flex flex-column">
      <Row className="d-flex flex-grow-1 align-items-md-center pb-6">
        <Col xs='12' md='9'>
          Col1
        </Col>
        <Col xs='12' md='3' className='text-center'>
          <img 
            className='border border-dark-subtle rounded-circle img-fluid object-fit-cover p-3 my-4 me-2' 
            src={currentUser?.profile_image}
          />
          <h1>{currentUser?.username}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
