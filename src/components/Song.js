import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Song = ({song, include_details = false}) => {
  return (
    <div className='border rounded p-2 bg-secondary-subtle bg-gradient'>
      { include_details ? (<>
        <Row className='text-center m-2'>
          <Col>
            <span className='fw-bold'>{song.title}</span> by <span className='fw-bold'>{song.artist_name}</span>
          </Col>
        </Row>
      <hr />
      </>) : (
        ''
      )}
      <Row>
        <audio controls className='mw-100'>
            <source src={song.audio_url} type='audio/wav' />
        </audio>
      </Row>
    </div>
  )
}

export default Song
