import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Song = ({song, includeDetails = false}) => {
  return (<>
    <div className={`border rounded p-2 bg-secondary-subtle bg-gradient ${song.is_user && 'rounded-bottom-0'}`}>
      { includeDetails ? (<>
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
    { song.is_user && (
      <Link
        to={`/edit-song/${song.id}`}
        className='btn btn-warning w-100 rounded-top-0 text-center'>
        Edit&ensp;
        <i className="fa-solid fa-pen-to-square" />
      </Link>
    )}
  </>)
}

export default Song
