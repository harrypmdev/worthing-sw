import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { useCurrentUser } from '../contexts/CurrentUserContext';
import SongList from '../components/SongList';
import Feed from '../components/Feed';
import ProfileSummary from '../components/ProfileSummary';

const Profile = ({ownProfile}) => {
  const currentUser = useCurrentUser();

  return (
    <Container className="flex-grow-1 d-flex flex-column mt-2">
      <Row>
        <Col xs='12' md='4' lg='3' xl='2'>
          <ProfileSummary user={currentUser}/>
        </Col>
        <Col className='d-flex' xs='12' md='8' lg='9' xl='10'>
            <Feed user_id={currentUser?.pk} limit={3}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
