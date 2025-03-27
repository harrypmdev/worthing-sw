import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Vote from './Vote'

const Song = ({song, includeDetails=false, editable=false, number=false}) => {
  return (<>
    <div className={`border rounded p-2 bg-secondary-subtle bg-gradient ${song.is_user && 'rounded-bottom-0'}`}>
      { includeDetails ? (<>
        <Row className='d-flex m-2 align-items-center flex-nowrap'>
          {number && (
            <Col xs='auto' className='text-start'>
              <i className={`fa-solid fa-${number}`}/>
            </Col>
          )}
          <Col className='flex-grow-1 text-center text-wrap'>
            <span className='fw-bold'>{song.title}</span> by <span className='fw-bold'>{song.artist_name}</span>
          </Col>
          <Col xs='auto' className='text-end'>
            <Vote song={song}/>
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
    { song.is_user && editable && (
      <Link
        to={`/edit-song/${song.id}`}
        className='btn btn-warning w-100 rounded-top-0 text-center mb-3'>
        Edit&ensp;
        <i className="fa-solid fa-pen-to-square"></i>
      </Link>
    )}
  </>)
}

export default Song
