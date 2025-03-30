import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Feed from '../components/Feed';
import ProfileSummary from '../components/ProfileSummary';
import { axiosReq } from '../api/axiosDefaults';
import { useParams } from 'react-router-dom';
import FullPageSpinner from '../components/spinner/FullPageSpinner';

const Profile = () => {
  const {id} = useParams();
  const [profile, setProfile] = useState(null);
  const [songData, setSongData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async() => {
        try {
            const [{data: profile}, {data: songs}] = await Promise.all([
                axiosReq.get(`/profiles/${id}`),
                axiosReq.get(`/songs/?ordering=-net_votes&user=${id}`)
            ])
            setProfile(profile);
            setSongData(songs.results);
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }

    fetchProfile();
  }, [id])

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column mt-2">
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
