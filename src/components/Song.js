import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Vote from './Vote'

/**
 * Render a song depending on the given props, rendering an audio player and other details
 * if appropriate.
 * 
 * @param {Object} song An object containing song details as retrieved from the '/songs' endpoint.
 * @param {boolean} [includeDetails=false] Whether or not the song should include details such as the
 *                                         title, artist name and vote counter, rather than just the
 *                                         audio clip.
 * @param {boolean} [editable=false] Whether or not the song should be be editable if it belongs to the
 *                                   current user.
 * @param {number} [number=null] The font-awesome number that should display on this song as a 'ranking'.
 * @returns {ReactNode} - An element displaying the details of a song as returned from the '/songs' endpoint.
 */
const Song = ({song, includeDetails=false, editable=false, number=false}) => {
  return <>
    <div className={`border rounded p-2 bg-secondary-subtle bg-gradient ${song.is_user && editable &&  'rounded-bottom-0'}`}>
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
  </>
}

export default Song
