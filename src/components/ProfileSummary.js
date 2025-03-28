import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SongList from './SongList';
import styles from '../styles/ProfileSummary.module.css';


const ProfileSummary = ({profile, basic=false}) => {
  return (
      <Container className="mt-2">
          <Col xs='12' className='d-flex flex-column align-items-center'>
            <Image
              roundedCircle
              className={`border border-dark-subtle object-fit-cover
                          w-50 text-center ${styles.profileSummaryPicture}`}
              src={profile?.image}
            />
            <h1 className='h3 my-3 text-center'>{profile?.user}</h1>
            { profile?.bio && <p className='text-center'>{profile.bio}</p>}
            {!basic && (
              <p>
                Followers: {profile?.followers_count}&nbsp;
                Following: {profile?.following_count}
              </p>
            )}
            {!basic && (
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
            )}
          </Col>
          {!basic && (
            <Col xs='12'>
              <SongList profile={profile}/>
            </Col>
          )}
      </Container>
  )
}

export default ProfileSummary
