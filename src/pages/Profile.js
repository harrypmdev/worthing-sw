import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { useCurrentUser } from '../contexts/CurrentUserContext';
import SongList from '../components/SongList';
import Feed from '../components/Feed';
import ProfileSummary from '../components/ProfileSummary';
import { axiosReq } from '../api/axiosDefaults';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const {id} = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async() => {
        try {
            const {data} = await axiosReq.get(`/profiles/${id}`);
            setProfile(data);
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }
    setHasLoaded(false);
    fetchProfile();
  }, [id])

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column mt-2">
      <Row>
        <Col xs='12' md='4'>
          <ProfileSummary profile={profile}/>
        </Col>
        <Col className='d-flex flex-column' xs='12' md='8'>
            <Feed 
              profile={profile} 
              trailingText={`No more posts from ${profile?.user} yet.`}
              useAvatars={false}
            />
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
