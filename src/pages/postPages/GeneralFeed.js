import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import SongList from '../../components/songs/SongList';
import Feed from '../../components/posts/Feed';
import useFetchSong from '../../hooks/useFetchSong';
import ComponentSpinner from '../../components/spinner/ComponentSpinner';


const GeneralFeed = () => {
  const [songData, setSongData] = useState({});
  const hasLoaded = useFetchSong(
    {setSongData, filter: 'ordering=-net_votes'}
  )

  return (
    <Row>
      <Col xs={12} lg={8}>
        <Feed />
      </Col>
      <Col lg={4} className='d-none d-lg-block mt-3'>
        <h2 className='h4 text-center me-2 fw-bold'>Top Songs Right Now</h2>
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

export default GeneralFeed
