import React from 'react'
import { Container } from 'react-bootstrap';

import Song from './Song';

/**
 * Render a list of songs ranked from 1-3 by vote popularity.
 * 
 * @param {Object} songData An object containing a list of 'song' objects as retrieved from the '/songs' endpoint.
 * 
 * @param {Object} [profile=null] An object containing profile details as retrieved from the '/profiles' endpoint.
 *                                If not passed, component simply does not show song count.
 * 
 * @returns {ReactNode} - An element displaying a list of ranked songs as returned from the '/songs' endpoint. 
 */
const SongList = ({songData, profile=null}) => {
  return (
    <Container className='flex-grow-1 d-flex flex-column'>
      { songData.length > 0 && profile && (
        <h2 className='h6 text-center fw-bold'>Songs ({profile.songs_count}/3)</h2>
      )}
      { songData.map((song, index) => (
        <div key={song.id}>
        <Song song={song} number={index+1} includeDetails editable/>
        <br />
        </div>
      ))}
      { !songData.length && (
        <div className='text-center my-3 fst-italic'>No songs yet.</div>
      )}
    </Container>
  )
}

export default SongList
