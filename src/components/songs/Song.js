import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Vote from '../Vote'

/**
 * Render a song depending on the given props, rendering an audio player and other details
 * if appropriate.
 * 
 * @param {Object} song An object containing song details as retrieved from the '/songs' endpoint.
 * 
 * @param {boolean} [includeDetails=false] Whether or not the song should include details such as the
 *                                         title, artist name and vote counter, rather than just the
 *                                         audio clip.
 * 
 * @param {boolean} [editable=false] Whether or not the song should be be editable if it belongs to the
 *                                   current user.
 * 
 * @param {number} [number=null] The font-awesome number that should display on this song as a 'ranking'.
 * 
 * @returns {ReactNode} - An element displaying the details of a song as returned from the '/songs' endpoint.
 */
const Song = ({song, includeDetails=false, editable=false, number=false}) => {

  /**
   * Handle the clicking of the link to the full song.
   * Opens a confirmation screen that warns the user they are opening a link uploaded by a user 
   * to an outside page. Opens the link in a new tab only if the user confirms.
   * 
   * @param {Event} event The event triggered by the clicking of the button that links to the full song.
   */
  const handleLinkClick = event => {
    if (!window.confirm(
      `This will open a link uploaded by a site user to an outside page:\n${song.link_to_song}
      \nDo you wish to proceed?`
    )) {
      event.preventDefault();
    }
  }

  return <>
    <div 
      className={
        `border rounded p-2 bg-secondary-subtle bg-gradient 
        ${((song.is_user && editable) || (includeDetails && song.link_to_song)) && 'rounded-bottom-0'}`
      }
    >
      { includeDetails ? (<>
        <Row className='d-flex m-2 align-items-center flex-nowrap'>
          {number && (
            <Col xs='auto' className='text-start'>
              <i className={`fa-solid fa-${number}`}/>
            </Col>
          )}
          <Col className='flex-grow-1 text-center text-break'>
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
    <Row className='p2'>
      { includeDetails && song.link_to_song && (
        <Col 
          xs={(song.is_user && editable) ? '6' : '12'} 
          className={`${(song.is_user && editable) && 'pe-0'}`}>
          <Link
            target='_blank'
            to={song.link_to_song}
            onClick={handleLinkClick}
            className={
              `btn btn-primary w-100 rounded-top-0 text-center
              ${(song.is_user && editable) && 'rounded-end-0'}`
            }>
            Full&ensp;
            <i className='fa-solid fa-up-right-from-square'></i>
          </Link>
        </Col>
      )}
      <Col className={`${(song.link_to_song && includeDetails) && 'ps-0'}`}>
        { song.is_user && editable && (
          <Link
            to={`/edit-song/${song.id}`}
            className={
              `btn btn-warning w-100 rounded-top-0 text-center mb-3
              ${(song.link_to_song && includeDetails) && 'rounded-start-0'}`
            }
          >
            Edit&ensp;
            <i className='fa-solid fa-pen-to-square'></i>
          </Link>
        )}
      </Col>
    </Row>
  </>
}

export default Song
