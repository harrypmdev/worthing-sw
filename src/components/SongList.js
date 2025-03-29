import React from 'react'
import { Container } from 'react-bootstrap';

import Song from './Song';

/**
 * Render a list of songs ranked from 1-3 by vote popularity.
 * 
 * @param {Object} profile An object containing profile details as retrieved from the '/profiles' endpoint.
 * @param {Object} songData An object containing a list of 'song' objects as retrieved from the '/songs' endpoint.
 * @returns {ReactNode} - An element displaying a list of ranked songs as returned from the '/songs' endpoint. 
 */
const SongList = ({profile, songData}) => {
  return (
    <Container className="flex-grow-1 d-flex flex-column">
      { songData.length && (
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
