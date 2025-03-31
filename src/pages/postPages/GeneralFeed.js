import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import SongList from '../../components/SongList';
import FullPageSpinner from '../../components/spinner/FullPageSpinner';
import Feed from '../../components/Feed';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/spinner/Asset';

const GeneralFeed = () => {
  const [songData, setSongData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchSongs = async() => {
        try {
            const {data} = await axiosReq.get('/songs/?ordering=-net_votes')
            setSongData(data.results.slice(0, 10));
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }

    fetchSongs();
  }, [])

  return (
    <Row>
      <Col xs={12} lg={8}>
        <Feed />
      </Col>
      <Col lg={4} className='d-none d-lg-block mt-3'>
        <h2 className='h4 text-center me-2 fw-bold'>Top Songs Right Now</h2>
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

export default GeneralFeed
