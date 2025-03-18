import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { useCurrentUser } from '../contexts/CurrentUserContext';
import SongList from '../components/SongList';
import Feed from '../components/Feed';

const Profile = ({ownProfile}) => {
  const currentUser = useCurrentUser();

  return (
    <Container className="flex-grow-1 d-flex flex-column mt-2">
      <Row className="d-flex flex-grow-1 align-items-center pb-6">
        <Col xs='12' sm='6' lg='3' className='text-center'>
          <img 
            className='border border-dark-subtle rounded-circle img-fluid object-fit-cover p-3 mb-4 mt-2 me-2' 
            src={currentUser?.profile_image}
          />
          <h1 className='mb-4'>{currentUser?.username}</h1>
        </Col>
        <Col xs='12' sm='6' lg='3'>
          <SongList user_id={currentUser?.pk}/>
        </Col>
        <Col className='d-flex' xs='12' lg='6'>
            <Feed user_id={currentUser?.pk} limit={3}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
