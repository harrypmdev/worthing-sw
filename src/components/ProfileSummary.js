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
            <Col>
              {profile.is_user && (
                <Link to='/edit-profile/'>
                  <Button variant='outline-dark' className='mb-3 me-1'>
                    Edit Profile <i className="fa-solid fa-gear ms-1"></i>
                  </Button>
                </Link>
              )}
              {profile.is_user && (profile.songs_count < 3) && (
                <Link to='/create-song/'>
                  <Button variant='outline-primary' className='mb-3 ms-1'>
                    Add Song <i className="fa-solid fa-plus ms-1"></i>
                  </Button>
                </Link>
              )}
            </Col>
          </Col>
          <Col xs='12'>
            <SongList profile={profile}/>
          </Col>
      </Container>
  )
}

export default ProfileSummary
