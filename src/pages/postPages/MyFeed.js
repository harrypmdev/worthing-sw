import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import SongList from '../../components/songs/SongList';
import Feed from '../../components/posts/Feed';
import useFetchSong from '../../hooks/useFetchSong';
import ComponentSpinner from '../../components/spinner/ComponentSpinner';

/**
 * Render the My Feed page, which displays a feed of posts on the site 
 * (most recent at the top) from users the current user is following only.
 * Also displays songs from the users the current user is following ranked
 * 1 - 10.
 * 
 * @returns {ReactNode} - An element displaying the full my feed page.
 */
const MyFeed = () => {
  useRedirect('loggedOut')
  const currentUser = useCurrentUser();
  const [songData, setSongData] = useState({});
  const filter = currentUser?.pk
  ? `/songs/?ordering=-net_votes&user__followed__user=${currentUser?.pk}`
  : null;
  const hasLoaded = useFetchSong({setSongData, filter});

  return (
      <Row>
        <Col xs={12} lg={8}>
          { currentUser?.pk 
            ? <Feed filterByFollowingId={currentUser.pk} /> 
            : <ComponentSpinner />
          }
        </Col>
        <Col lg={4} className='d-none d-lg-block mt-3'>
          <h2 className='h4 text-center me-2 fw-bold'>Top Songs From Your Followed</h2>
          <hr />
          { hasLoaded ? (
            <SongList songData={songData.results.slice(0, 10)}/>
          ) : (
            <ComponentSpinner />
          )}
        </Col>
      </Row>
  )
}

export default MyFeed
