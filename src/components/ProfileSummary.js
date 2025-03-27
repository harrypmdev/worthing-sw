import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SongList from './SongList';
import { useCurrentUser } from '../contexts/CurrentUserContext';


const ProfileSummary = ({profile}) => {
  return (
      <Container className="mt-2">
          <Col xs='12' className='d-flex flex-column align-items-center'>
            <img 
              className='border border-dark-subtle rounded-circle 
                          w-50 text-center' 
              src={profile?.image}
            />
            <h1 className='h3 my-3 text-center'>{profile?.user}</h1>
            <p>
            Followers: {profile?.followers_count}&nbsp;
            Following: {profile?.following_count}
            </p>
            {profile.is_user && (profile.songs_count < 3) && (
              <Link to='/create-song/'>
                <Button variant='outline-primary' className='mb-3'>Add Song</Button>
              </Link>
            )}
          </Col>
          <Col xs='12'>
            <SongList profile={profile}/>
          </Col>
      </Container>
  )
}

export default ProfileSummary
