import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { useCurrentUser } from '../contexts/CurrentUserContext';
import SongList from '../components/SongList';
import Feed from '../components/Feed';
import ProfileSummary from '../components/ProfileSummary';

const Profile = ({ownProfile}) => {
  const currentUser = useCurrentUser();

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column mt-2">
      <Row>
        <Col xs='12' md='4'>
          <ProfileSummary user={currentUser}/>
        </Col>
        <Col className='d-flex flex-column' xs='12' md='8'>
            <Feed user_id={currentUser?.pk}/>

            <div className='text-center my-3 fst-italic'>No more posts from {currentUser?.username} yet.</div>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
