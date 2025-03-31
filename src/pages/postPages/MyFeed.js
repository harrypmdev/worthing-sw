import React, { useEffect, useState } from 'react'
import Feed from '../../components/Feed';
import { Col, Row } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { axiosReq } from '../../api/axiosDefaults';
import SongList from '../../components/SongList';
import Asset from '../../components/spinner/Asset';


const MyFeed = () => {
  useRedirect('loggedOut')
  const currentUser = useCurrentUser();
  const [songData, setSongData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchSongs = async() => {
        try {
            const {data} = await axiosReq.get(
              `/songs/?ordering=-net_votes&user__followed__user=${currentUser.pk}`
            )
            setSongData(data.results.slice(0, 10));
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }

    if (currentUser) {
      fetchSongs();
    }
  }, [currentUser])

  return (
      <Row>
        <Col xs={12} lg={8}>
          { currentUser?.pk 
            ? <Feed filterByFollowingId={currentUser.pk} /> 
            : <Asset spinner />
          }
        </Col>
        <Col lg={4} className='d-none d-lg-block mt-3'>
          <h2 className='h4 text-center me-2 fw-bold'>Top Songs From Your Followed</h2>
          <hr />
          { hasLoaded ? (
            <SongList songData={songData}/>
          ) : (
            <Asset spinner/>
          )}
        </Col>
      </Row>
  )
}

export default MyFeed
