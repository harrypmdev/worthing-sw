import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Feed from '../../components/posts/Feed';
import ProfileSummary from '../../components/profile/ProfileSummary';
import { useParams } from 'react-router-dom';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import useFetchProfileData from '../../hooks/useFetchProfileData';

/**
 * Render the Profile page.
 * Displays the user's current profile image, their songs, and a feed
 * of their posts.
 * 
 * @returns {ReactNode} - An element displaying the full profile page.
 */
const Profile = () => {
  const {id} = useParams();
  const [profile, setProfile] = useState(null);
  const [songData, setSongData] = useState(null);
  const hasLoaded = useFetchProfileData({id, setProfile, setSongData});

  return (
    <Container fluid className='flex-grow-1 d-flex flex-column mt-2'>
      {hasLoaded ? (
        <Row>
          <Col xs='12' lg='4'>
            <ProfileSummary profile={profile} songData={songData}/>
          </Col>
          <Col className='d-flex flex-column' xs='12' lg='8'>
              <Feed
                filterByOwnershipId={profile.user_id} 
                useAvatars={false}
                editable={true}
              />
          </Col>
        </Row>
      ) : (
        <FullPageSpinner />
      )}
    </Container>
  )
}

export default Profile
