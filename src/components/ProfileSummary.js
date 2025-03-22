import React from 'react';
import SongList from './SongList';
import { Col, Container, Row } from 'react-bootstrap';

const ProfileSummary = ({user}) => {
    return (
        <Container className="mt-2">
            <Col xs='12' className='d-flex flex-column align-items-center'>
              <img 
                className='border border-dark-subtle rounded-circle 
                           w-50 text-center' 
                src={user?.profile_image}
              />
              <h1 className='h3 my-3 text-center'>{user?.username}</h1>
            </Col>
            <Col xs='12'>
              <SongList user_id={user?.pk}/>
            </Col>
        </Container>
    )
}

export default ProfileSummary
