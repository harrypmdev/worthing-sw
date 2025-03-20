import React from 'react';
import SongList from './SongList';
import { Col, Container, Row } from 'react-bootstrap';

const ProfileSummary = ({user}) => {
    return (
        <Container className="mt-2">
            <Col xs='12' className='d-flex flex-column justify-content-center'>
              <img 
                className='border border-dark-subtle rounded-circle 
                           img-fluid object-fit-contain p-3 mb-4 mt-2 
                           mx-xs-5 mx-md-2 mx-lg-0' 
                src={user?.profile_image}
              />
              <h1 className='mb-4 text-center'>{user?.username}</h1>
            </Col>
            <Col xs='12'>
              <SongList user_id={user?.pk}/>
            </Col>
        </Container>
    )
}

export default ProfileSummary
