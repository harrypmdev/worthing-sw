import React from 'react';
import { Button, Col, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SongList from './SongList';
import styles from '../styles/ProfileSummary.module.css';
import Follow from './Follow';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * Render a summary of a profile, including the profile image, followers,
 * songs and profile editing options if it belongs to the current user.
 * 
 * @param {Object} profile An object containing profile details as retrieved from the '/profiles' endpoint.
 * @param {Object} songData An object containing a list of 'song' objects as retrieved from the '/songs' endpoint.
 * @returns {ReactNode} - An element displaying a summary of a user's profile.
 */
const ProfileSummary = ({profile, songData}) => {
  const currentUser = useCurrentUser();
  const showCreateSongsButton = profile.is_user && (profile.songs_count < 3);

  return (
    <Container className="mt-2">
        <Col xs='12' className='d-flex flex-column align-items-center'>
          <Image
            roundedCircle
            className={`border border-dark-subtle object-fit-cover
                        w-50 text-center ${styles.profileSummaryPicture}`}
            src={profile?.image}
          />
          <Col className='d-flex align-items-center justify-content-center'>
            <h1 className={`h3 my-3 text-center ${!profile?.is_user && 'me-3'}`}>{profile?.user}</h1>
            {!profile?.is_user && currentUser && 
              <Follow
                currentFollower={profile.following_id}
                userToFollow={profile.user_id}
              />
            }
          </Col>
          { profile?.bio && <p className='text-center text-break'>{profile.bio}</p>}
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
            {showCreateSongsButton && (
              <Link to='/create-song/'>
                <Button variant='outline-primary' className='mb-3 ms-1'>
                  Add Song <i className="fa-solid fa-plus ms-1"></i>
                </Button>
              </Link>
            )}
          </Col>
        </Col>
        <Col xs='12'>
          <SongList profile={profile} songData={songData}/>
        </Col>
    </Container>
  )
}

export default ProfileSummary
